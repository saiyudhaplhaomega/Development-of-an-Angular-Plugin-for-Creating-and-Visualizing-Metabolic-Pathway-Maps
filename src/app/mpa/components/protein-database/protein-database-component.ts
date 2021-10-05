import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-navigation-tree/services/data.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-folder-page',
  templateUrl: './folder-page.component.html',
  styleUrls: ['./folder-page.component.css']
})
export class ProteinDatabaseComponent implements OnInit {

  uuid: string;
  name: string;

  private _dataMap: Map<string, DataItem>;

  constructor(private _snackBar: MatSnackBar, private dataService: DataService) { }

  ngOnInit() {
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
      const item = this._dataMap.get(this.uuid);
      item.displayName = this.name;
      this._dataMap.set(this.uuid, item);
      this.dataService.dataMap.next(this._dataMap);
    }
  }

  onAddExperiment() {
    console.log('add experiment');
    // this.dataService.addExperiment(this.uuid);
  }

  onAddProteinDatabase() {
    console.log('add proteindb');
    this.dataService.addProteinDatabase(this.uuid);
  }

  onAddFolder() {
    console.log('add folder');
    this.dataService.addFolder(this.uuid);
  }

  onRemoveFolder() {
    const snackBarRef = this._snackBar.open('Delete folder', 'Confirm', {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.dataService.removeFolder(this.uuid);
    });
  }

}
