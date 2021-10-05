import {Component, OnChanges, OnInit} from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {DialogComponent} from '../../../core/components/dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  uuid: string;
  name: string;

  // contains folder names for overview
  private folders: string[];
  private experiments: string[];
  private proteinDB: string[];

  constructor(private dataService: DataService,
              public dialog: MatDialog) {
    this.folders = [];
    this.experiments = [];
    this.proteinDB = [];
  }

  ngOnInit(): void {
    this.dataService.dataMap.subscribe(items => {
      const newFolders = [];
      const newExperiments = [];
      const newDataBases = [];
      for (const [key, value] of items.entries()) {
        if (value.type === 'folder') {
          newFolders.push(value.displayName);
          this.folders = newFolders;
        } else if (value.type === 'experiment') {
          newExperiments.push(value.displayName);
          this.experiments = newExperiments;
        } else if (value.type === 'proteindb') {
          this.proteinDB = newDataBases;
        }
      }
    }
    );
  }

  onAddFolder() {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
    });
    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Please set a folder name!';
    dialogInstance.textFieldLabel = 'Folder Name';

    dialogRef.afterClosed().subscribe(folderName => {
      if (folderName) {
        console.log('add folder');
        this.dataService.addFolder(this.uuid, folderName);
      }
    });
  }
}
