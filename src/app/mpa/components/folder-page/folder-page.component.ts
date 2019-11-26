import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import v1 from 'uuid/v1';

@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css']
})
export class FolderPageComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataItems: DataItem[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.dataItems.subscribe( items => {
      this._dataItems = items;
    });
  }

  onAccept() {
    this._dataItems.forEach( item => {
      if (item.uuid === this.uuid) {
        item.displayName = this.name;
        console.log(this.name);
        return;
      }
    });
    this.dataService.dataItems.next(this._dataItems);
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
      uuid: v1(),
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

}
