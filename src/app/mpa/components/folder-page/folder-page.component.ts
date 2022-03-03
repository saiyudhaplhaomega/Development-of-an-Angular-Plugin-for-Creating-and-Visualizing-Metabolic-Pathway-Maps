import {Component, OnInit} from '@angular/core';
import {DataService, NodeType} from '../data-navigation-tree/services/data.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NameEditDialogComponent} from '../../../core/components/dialog/name-edit-dialog.component';
import {ProteinDatabaseDialogComponent} from './protein-database-dialog/protein-database-dialog.component';
import {HttpClientService} from '../../../core/services/http-client.service';
import {Filemetadata} from '../../objects/filemetadata';
import {Endpoints} from '../../../core/services/webserveraddress.service';
import {HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css']
})
export class FolderPageComponent implements OnInit {

  id: string;
  parentUuid: string;
  name: string;
  existingNodeNames = [];

  private _dataMap: Map<string, DataItem>;

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              public dialog: MatDialog,
              private uploaderService: HttpClientService) {}

  ngOnInit() {
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });

    this.parentUuid = this._dataMap.get(this.id).parent;
  }

  onAccept() {
    if (this.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.name = '';
    } else if (this.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      const item = this._dataMap.get(this.id);
      item.displayName = this.name;
      this._dataMap.set(this.id, item);
      this.dataService.dataMap.next(this._dataMap);
    }
  }

  onAddExperiment() {
    const dialogRef = this.dialog.open(NameEditDialogComponent, {
      disableClose: true,
    });
    // gets instance of the dialog component...
    const dialogInstance = dialogRef.componentInstance;
    // ...and allows to inject variables
    dialogInstance.dialogPrompt = 'Please set an experiment name!';
    dialogInstance.textFieldLabel = 'Experiment Name';

    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        console.log('add experiment');
        this.dataService.addNodeObj(this.id, folderName, NodeType.Experiment, null);
      }
    });
  }

  onAddProteinDatabase() {
    // const fileMetaData = {filename: string, experimentuuid: string};
    const dialogRef = this.dialog.open(ProteinDatabaseDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(dialog  => {
      console.log('dialog?: ' + dialog.dbName);
      console.log('dialog?: ' + dialog.dbFile.name);
      if (dialog.dbName) {
        console.log('add proteindb: ' + dialog.dbName);

        const fileData: Filemetadata = {
          filename: dialog.dbFile.name,
          fileType: 'fasta',
          fileUUID: null,
        };

        // metadata endpoint, wait for File ID
        this.uploaderService.postObject<Filemetadata, Filemetadata>(fileData, Endpoints.PROTEINLOADER_METADATA).subscribe(result => {
          if (result != null) {
            console.log(result.fileUUID);
            // upload fasta/xml file
            const params: HttpParams = new HttpParams({fromObject: {'jobid': result.fileUUID, 'name': fileData.filename}});
            this.uploaderService.postFile(dialog.dbFile, Endpoints.PROTEINLOADER_FILEUPLOAD, params).subscribe(result2 => {
              if (result2 != null) {
                // TODO: executes multiple times, fixed for now on dataservice side
                this.dataService.addNodeObj(this.id, dialog.dbName, NodeType.ProteinDB, result.fileUUID);
              }
            });
          }
        });

        // fileMetaData.filename = dbName;
        // fileMetaData.experimentuuid = this.uuid;
      }
    });

    // this.uploaderService.postObjDifferentReturnValue(fileMetaData, file.metaDataAdress).subscribe(
    //   result => {
    //     console.log(result);
    //   }
    // )
  }

  onAddFolder() {

    const dialogRef = this.dialog.open(NameEditDialogComponent, {
      disableClose: true,
    });
    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Please set a folder name!';
    dialogInstance.textFieldLabel = 'Folder Name';

    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        console.log('add folder');
        this.dataService.addNodeObj(this.id, folderName, NodeType.Folder, null);
      }
    });
  }

  onRemoveFolder() {
      this.dataService.removeNode(this.id, this.id, this.parentUuid);
  }
}
