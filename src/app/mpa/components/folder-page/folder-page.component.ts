import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NameEditDialogComponent} from '../../../core/components/dialog/name-edit-dialog.component';
import {ProteinDatabaseDialogComponent} from './protein-database-dialog/protein-database-dialog.component';


@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css']
})
export class FolderPageComponent implements OnInit {

  uuid: string;
  parentUuid: string;
  name: string;
  existingNodeNames = [];

  private _dataMap: Map<string, DataItem>;

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });

    this.parentUuid = this._dataMap.get(this.uuid).parent;
    }

  onAccept() {
    if (this.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.name = '';
    } else if (this.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      const item = this._dataMap.get(this.uuid);
      item.displayName = this.name;
      this._dataMap.set(this.uuid, item);
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
        this.dataService.addExperiment(this.uuid, folderName);
      }
    });
  }

  onAddProteinDatabase() {
    const dialogRef = this.dialog.open(ProteinDatabaseDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(dbName => {
      if (dbName) {
        console.log('add proteindb');
        this.dataService.addProteinDatabase(this.uuid, dbName);
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

    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        console.log('add folder');
        this.dataService.addFolder(this.uuid, folderName); }
    });
  }

  onRemoveFolder() {
      this.dataService.removeNode(this.uuid, this.uuid, this.parentUuid);
  }
}
