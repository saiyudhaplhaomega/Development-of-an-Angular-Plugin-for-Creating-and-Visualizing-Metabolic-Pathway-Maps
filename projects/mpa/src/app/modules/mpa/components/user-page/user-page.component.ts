import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DataService,
  NodeType,
} from '../../services/data.service';
import { NameEditDialogComponent } from '../../components/name-edit-dialog/name-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContentComponent } from '../../mpa.component';
import { DataItem } from '../../model/data-item';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit, OnDestroy, ContentComponent {
  dataItemOfThisComponent: DataItem;

  // contains folder names for overview
  folders: string[];
  experiments: string[];
  proteinDB: string[];

  private dataServiceSubscription;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.folders = [];
    this.experiments = [];
    this.proteinDB = [];
  }

  ngOnInit(): void {
    this.dataServiceSubscription = this.dataService.dataMap.subscribe(
      (dataItemMap) => {
        const newFolders = [];
        const newExperiments = [];
        const newDataBases = [];
        dataItemMap.getDataItemList().forEach((value) => {
          if (value.type === NodeType.Folder) {
            newFolders.push(value.displayName);
          } else if (value.type === NodeType.Experiment) {
            newExperiments.push(value.displayName);
          } else if (value.type === NodeType.ProteinDB) {
            newDataBases.push(value.displayName);
          }
        });
        this.folders = newFolders;
        this.experiments = newExperiments;
        this.proteinDB = newDataBases;
      }
    );
  }

  ngOnDestroy(): void {
    this.dataServiceSubscription.unsubscribe();
  }

  onAddFolder(): void {
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
}
