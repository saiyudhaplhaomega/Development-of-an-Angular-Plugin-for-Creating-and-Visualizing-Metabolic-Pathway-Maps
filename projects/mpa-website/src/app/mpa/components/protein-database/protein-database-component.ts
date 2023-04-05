import { Component, OnInit } from '@angular/core';
import { DataService2 } from '../data-navigation-tree/services/data2.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentComponent } from '../../mpa.component';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../../../core/components/textfield-dialog/textfield-dialog.component';

@Component({
  selector: 'app-protein-database-component',
  templateUrl: './protein-database-component.html',
  styleUrls: ['./protein-database-component.css'],
})
export class ProteinDatabaseComponent implements OnInit, ContentComponent {
  id: number;
  name: string;

  UUID: string;
  creationDate: string;
  originalFilename: string;
  totalProteins: string;
  description: string;

  dataItemOfThisComponent: DataItem;

  private _dataMap: Map<number, DataItem>;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService2,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    //  TODO: request db metadata from server
    this.dataService.dataMap.subscribe((items) => {
      // TODO: this._dataMap = items;
    });
    this.UUID = this.dataItemOfThisComponent.uuid;
    console.log(this.dataItemOfThisComponent)
    this.creationDate = this.dataItemOfThisComponent.creationDate;
    this.description = this.dataItemOfThisComponent.description;
    this.name = this.dataItemOfThisComponent.displayName;
    this.dataService.getFastaData(this.UUID).subscribe(fastaData => {
      this.totalProteins = fastaData.totalProteins.toString();
      this.originalFilename = fastaData.originalFileName;
    })
  }

  setDescription(){
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit Protein Database description';
    dialogInstance.description = this.dataItemOfThisComponent.description;

    dialogRef.afterClosed().subscribe((dbDescription) => {
      if (this.dataItemOfThisComponent.uuid){
      this.dataItemOfThisComponent.description = dbDescription;
      this.updateProteinDB();
      }
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

  removeProteinDB() {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }

  updateProteinDB(): void {
    this.dataService.updateFastaData(this.dataItemOfThisComponent);
    //this.dataService.updateNode(this.dataItemOfThisComponent);
  }
}
