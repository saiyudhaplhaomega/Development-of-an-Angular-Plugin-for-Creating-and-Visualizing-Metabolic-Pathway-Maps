import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DataService2,
  NodeType,
} from '../data-navigation-tree/services/data2.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { NameEditDialogComponent } from '../../../core/components/dialog/name-edit-dialog.component';
import { ProteinDatabaseDialogComponent } from './protein-database-dialog/protein-database-dialog.component';
import { HttpClientService } from '../../../core/services/http-client.service';
import { Filemetadata } from '../../objects/filemetadata';
import { Endpoints } from '../../../core/services/webserveraddress.service';
import { HttpParams } from '@angular/common/http';
import { ContentComponent } from '../../mpa.component';
import { TextfieldDialogComponent } from '../../../core/components/textfield-dialog/textfield-dialog.component';
import { FolderJSONObject } from '../../objects/folderjson';

@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css'],
})
export class FolderPageComponent
  implements OnInit, OnDestroy, ContentComponent
{
  dataItemOfThisComponent: DataItem;
  folder = new FolderJSONObject();
  existingNodeNames = [];
  subfolders: string[];
  experiments: string[];
  protdbs: string[];
  description: string;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private dataService: DataService2,
    private uploaderService: HttpClientService
  ) {
    this.subfolders = [];
    this.experiments = [];
    this.protdbs = [];
    this.description = '';
  }

  ngOnInit(): void {
    //this.parentUuid = this._dataMap.get(this.id).parent;
    const nexperiments = [];
    const nprotdbs = [];
    const nsubfolders = [];
    this.dataItemOfThisComponent.children.forEach((child) => {
      if (child.type === NodeType.Folder) {
        nsubfolders.push(child.displayName);
      } else if (child.type === NodeType.Experiment) {
        nexperiments.push(child.displayName);
      } else if (child.type === NodeType.ProteinDB) {
        nprotdbs.push(child.displayName);
      }
    });
    this.experiments = nexperiments;
    this.protdbs = nprotdbs;
    this.subfolders = nsubfolders;

    this.folder.description = this.dataItemOfThisComponent.description;
  }

  ngOnDestroy(): void {}

  onSetDescription() {
    /**
     * handles description change
     */
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit folder description';
    dialogInstance.description = this.folder.description;

    dialogRef.afterClosed().subscribe((folderdescription) => {
      console.log('add description');
      this.folder.description = folderdescription;
      //TODO: const item = this._dataMap.get(this.dbExperiment.expid);
      //item.description = expDescription;
      //TODO: this._dataMap.set(this.dbExperiment.expid, item);
      // TODO: this.dataService.dataMap.next(this._dataMap);

      //TODO: updating description doesn't work as of now
      this.updateFolder();
    });
  }

  updateFolder(): void {
    this.dataService.updateNode(this.dataItemOfThisComponent);
  }

  onAcceptNameChange(): void {
    if (this.dataItemOfThisComponent.displayName.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.dataItemOfThisComponent.displayName = '';
    } else if (this.dataItemOfThisComponent.displayName.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      this.dataItemOfThisComponent.displayName =
        this.dataItemOfThisComponent.displayName;
      this.dataService.updateNode(this.dataItemOfThisComponent);
    }
  }

  onAddExperiment(): void {
    const dialogRef = this.dialog.open(NameEditDialogComponent, {
      disableClose: true,
    });
    // gets instance of the dialog component...
    const dialogInstance = dialogRef.componentInstance;
    // ...and allows to inject variables
    dialogInstance.dialogPrompt = 'Please set an experiment name!';
    dialogInstance.textFieldLabel = 'Experiment Name';

    dialogRef.afterClosed().subscribe((experimentName) => {
      if (experimentName) {
        console.log('add experiment');
        this.dataService.createNewDataItem(
          this.dataItemOfThisComponent,
          experimentName,
          NodeType.Experiment
        );
      }
    });
  }

  onAddProteinDatabase() {
    // const fileMetaData = {filename: string, experimentuuid: string};
    const dialogRef = this.dialog.open(ProteinDatabaseDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((dialog) => {
      if (dialog.dbName) {
        const fileData: Filemetadata = {
          filename: dialog.dbFile.name,
          fileType: 'fasta',
          fileUUID: null,
        };

        // metadata endpoint, wait for File ID
        this.uploaderService
          .postObject<Filemetadata, Filemetadata>(
            fileData,
            Endpoints.PROTEINLOADER_METADATA
          )
          .subscribe((result) => {
            if (result != null) {
              // upload fasta/xml file
              const params: HttpParams = new HttpParams({
                fromObject: { jobid: result.fileUUID, name: fileData.filename },
              });
              this.uploaderService
                .postFile(
                  dialog.dbFile,
                  Endpoints.PROTEINLOADER_FILEUPLOAD,
                  params
                )
                .subscribe((result2) => {
                  if (result2 != null) {
                    // TODO: executes multiple times, fixed for now on dataservice side
                    //this.dataService.addNodeObj(this.id, dialog.dbName, NodeType.ProteinDB, result.fileUUID);
                    let protDBNode = this.dataService.createNewDataItem(
                      this.dataItemOfThisComponent,
                      dialog.dbName,
                      NodeType.ProteinDB
                    );
                    if (protDBNode !== null) {
                      protDBNode.uuid = result.fileUUID;
                      this.dataService.updateNode(protDBNode);
                    }
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

    dialogRef.afterClosed().subscribe((folderName) => {
      if (folderName) {
        this.dataService.createNewDataItem(
          this.dataItemOfThisComponent,
          folderName,
          NodeType.Folder
        );
      }
    });
  }

  onRemoveFolder() {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }
}
