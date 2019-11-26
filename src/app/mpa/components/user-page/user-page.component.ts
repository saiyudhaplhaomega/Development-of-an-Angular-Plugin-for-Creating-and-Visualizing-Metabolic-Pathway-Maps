import { Component, OnInit } from '@angular/core';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { DataService } from '../data-navigation-tree/services/data.service';
import v1 from 'uuid/v1';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataItems: DataItem[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataItems.subscribe(items => {
      if (items) {
        this._dataItems = items;
      }
    });
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
}
