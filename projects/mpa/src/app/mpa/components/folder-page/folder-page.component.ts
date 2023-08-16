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
import {
  HttpClientService,
  MultiFileUploadData,
} from '../../../core/services/http-client.service';
import { Filemetadata } from '../../objects/filemetadata';
import { Endpoints } from '../../../core/services/webserveraddress.service';
import { HttpParams } from '@angular/common/http';
import { ContentComponent } from '../../mpa.component';
import { TextfieldDialogComponent } from '../../../core/components/textfield-dialog/textfield-dialog.component';
import { FolderJSONObject } from '../../objects/folderjson';
import { ProtDBJSONObject } from '../../objects/protdbjson';
import { CompareExperimentsDialogComponentComponent } from '../experiment-page/compare-experiments-dialog/compare-experiments-dialog-component/compare-experiments-dialog-component.component';

enum ProteinDBType {
  FASTA,
  UNIPROTXML,
}
class ProteinDBMetadataJSON {
  originalFileName: String;
  name: String;
  dbType: ProteinDBType;
}

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
    dialogInstance.value = this.folder.description;
    dialogInstance.valueLabel = 'Description'

    dialogRef.beforeClosed().subscribe((folderdescription) => {
      if(folderdescription) {
        this.folder.description = folderdescription;
        this.updateFolder();
      }
    });
  }

  updateFolder(): void {
    this.dataService.updateNode(this.dataItemOfThisComponent);
  }

  onSetName(): void {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit folder name';
    dialogInstance.value = this.dataItemOfThisComponent.displayName;
    dialogInstance.valueLabel = 'name';
    dialogInstance.hasValidators = true;

    dialogRef.beforeClosed().subscribe((folderName) => {
      if (folderName) {
        this.dataItemOfThisComponent.displayName = folderName;
        this.updateFolder();
      }
    })
  }
  // onAcceptNameChange(): void {
  //   if (this.dataItemOfThisComponent.displayName.length > 24) {
  //     this._snackBar.open('Names longer than 24 characters are not allowed!');
  //     this.dataItemOfThisComponent.displayName = '';
  //   } else if (this.dataItemOfThisComponent.displayName.length <= 0) {
  //     this._snackBar.open('Empty names are not allowed!');
  //   } else {
  //     this.dataItemOfThisComponent.displayName =
  //       this.dataItemOfThisComponent.displayName;
  //     this.dataService.updateNode(this.dataItemOfThisComponent);
  //   }
  // }

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

  onAddComparison(): void {
    const dialogRef = this.dialog.open(CompareExperimentsDialogComponentComponent, {
      disableClose: true,
      data: {
        parentFolderDataObject: this.dataItemOfThisComponent,
        expName: null,
        expID: null
      }
    });
  }

  onAddProteinDatabase() {
    const dialogRef = this.dialog.open(ProteinDatabaseDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((dialog) => {
      if (dialog.dbName) {
        const metaData = new ProtDBJSONObject();
        metaData.name = dialog.dbName;
        metaData.originalFileName = dialog.dbFile.name;
        let protDBNode = this.dataService.createNewDataItem(
          this.dataItemOfThisComponent,
          dialog.dbName,
          NodeType.ProteinDB
        );
        metaData.creationdate = protDBNode.creationDate;
        let filesToUpload: MultiFileUploadData = {
          files: [],
          fileUploadAdress: Endpoints.PROTEINLOADER_FILEUPLOAD,
        };

        const configFile = new File([JSON.stringify(metaData)], 'config');
        filesToUpload.files.push({ uploadFile: configFile, fileID: 'config' });
        filesToUpload.files.push({
          uploadFile: dialog.dbFile,
          fileID: 'protDB',
        });

        this.uploaderService
          .postMultiPartFiles<ProtDBJSONObject>(
            filesToUpload,
            Endpoints.PROTEINLOADER_FILEUPLOAD
          )
          .subscribe((result) => {
            if (result != null) {
              if (protDBNode !== null) {
                protDBNode.uuid = result.protdb_id;
                this.dataService.updateNode(protDBNode);
              }
            }
          });
      }
    });
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
