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
    this.addExperiment();
    this.dataService.dataItems.next(this._dataItems);
  }

  addExperiment() {
    const newExperimentUUID = v1();
    const newExperiment = {
      displayName: 'new experiment',
      icon: 'computer',
      children: [],
      uuid: newExperimentUUID,
      type: 'experiment',
      parent: this.uuid,
    };
    this._dataItems.forEach( item => {
      if (item.uuid === this.uuid) {
        item.children.push(newExperimentUUID);
      }
    });
    this._dataItems.push(newExperiment);
    console.log(this._dataItems);
  }

  onAddFolder() {
    console.log('add folder');
    this.addFolder();
    this.dataService.dataItems.next(this._dataItems);
  }

  addFolder() {
    const newFolderUUID = v1();
    const newFolder = {
      displayName: 'new folder',
      icon: 'folder',
      children: [],
      uuid: newFolderUUID,
      type: 'folder',
      parent: this.uuid,
    };
    this._dataItems.forEach( item => {
      if (item.uuid === this.uuid) {
        item.children.push(newFolderUUID);
        return;
      }
    });
    this._dataItems.push(newFolder);
    console.log(this._dataItems);
  }

  onRemoveFolder() {
    let parent = '';
    let children = [];
    let deletedItem;

    this._dataItems.forEach( item => {
      if (item.uuid === this.uuid) {
        children = item.children;
        parent = item.parent;
        deletedItem = item;
        return;
      }
    });

    this._dataItems.forEach( item => {
      if (item.uuid === parent) {
        item.children.splice(item.children.indexOf(this.uuid), 1);
        item.children = item.children.concat(children);
      } else if (children.indexOf(item.uuid) > -1) {
        item.parent = parent;
      }
    });
    this._dataItems.splice(this._dataItems.indexOf(deletedItem), 1);
    console.log(this._dataItems);
    this.dataService.dataItems.next(this._dataItems);
  }

}
