import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';

@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css']
})
export class ExperimentPageComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataItems: DataItem[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
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

}
