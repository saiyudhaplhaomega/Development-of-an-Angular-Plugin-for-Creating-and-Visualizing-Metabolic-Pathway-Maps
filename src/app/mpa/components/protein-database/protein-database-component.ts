import { Component, OnInit } from '@angular/core';
import { DataService2 } from '../data-navigation-tree/services/data2.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-protein-database-component',
  templateUrl: './protein-database-component.html',
  styleUrls: ['./protein-database-component.css']
})
export class ProteinDatabaseComponent implements OnInit {

  id: number;
  name: string;

  private _dataMap: Map<number, DataItem>;

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService2) { }

  ngOnInit() {
    //  TODO: request db metadata from server
    this.dataService.dataMap.subscribe( items => {
      // TODO: this._dataMap = items;
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
      // TODO: this.dataService.dataMap.next(this._dataMap);
    }
  }

}
