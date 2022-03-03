import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-protein-database-component',
  templateUrl: './protein-database-component.html',
  styleUrls: ['./protein-database-component.css']
})
export class ProteinDatabaseComponent implements OnInit {

  id: string;
  name: string;

  private _dataMap: Map<string, DataItem>;

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService) { }

  ngOnInit() {
    //  TODO: request db metadata from server
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });
  }

  onAccept() {
    if (this.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.name = '';
    } else if (this.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      const item = this._dataMap.get(this.id);
      item.displayName = this.name;
      this._dataMap.set(this.id, item);
      this.dataService.dataMap.next(this._dataMap);
    }
  }

}
