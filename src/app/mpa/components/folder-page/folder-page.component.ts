import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import v1 from 'uuid/v1';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css']
})
export class FolderPageComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataItems: DataItem[];

  constructor(private _snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataItems.subscribe( items => {
      this._dataItems = items;
    });
  }

  onAccept() {
    if (this.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.name = '';
    } else if (this.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      this._dataItems.forEach( item => {
        if (item.uuid === this.uuid) {
          item.displayName = this.name;
          console.log(this.name);
          return;
        }
      });
      this.dataService.dataItems.next(this._dataItems);
    }
  }

  onAddExperiment() {
    console.log('add experiment');
    this.dataService.addExperiment(this.uuid);
  }

  onAddFolder() {
    console.log('add folder');
    this.dataService.addFolder(this.uuid);
  }

  onRemoveFolder() {
    this.dataService.removeFolder(this.uuid);
  }

}
