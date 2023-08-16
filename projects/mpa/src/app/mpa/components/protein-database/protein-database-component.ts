import { Component, OnInit } from '@angular/core';
import { DataService2 } from '../data-navigation-tree/services/data2.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentComponent } from '../../mpa.component';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../../../core/components/textfield-dialog/textfield-dialog.component';
import { ProtDBJSONObject } from '../../objects/protdbjson';
import { DataItemMap } from '../data-navigation-tree/objects/data-item-map';

@Component({
  selector: 'app-protein-database-component',
  templateUrl: './protein-database-component.html',
  styleUrls: ['./protein-database-component.css'],
})
export class ProteinDatabaseComponent implements OnInit, ContentComponent {
  protDBDataObject: ProtDBJSONObject = new ProtDBJSONObject();

  dataItemOfThisComponent: DataItem;

  loading = true;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService2,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.protDBDataObject.protdb_id = this.dataItemOfThisComponent.uuid;
    this.protDBDataObject.creationdate =
      this.dataItemOfThisComponent.creationDate;
    this.protDBDataObject.description =
      this.dataItemOfThisComponent.description;
    this.protDBDataObject.name = this.dataItemOfThisComponent.displayName;
    if (this.dataItemOfThisComponent.uuid !== null) {
      this.dataService
        .getFastaData(this.protDBDataObject.protdb_id)
        .subscribe((fastaData) => {
          this.protDBDataObject = fastaData;
          this.loading = false;
        });
    }
  }

  setDescription() {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit Protein Database description';
    dialogInstance.value = this.dataItemOfThisComponent.description;
    dialogInstance.valueLabel = 'Description';

    dialogRef.afterClosed().subscribe((dbDescription) => {
      if (this.dataItemOfThisComponent.uuid) {
        this.dataItemOfThisComponent.description = dbDescription;
        this.protDBDataObject.description =
          this.dataItemOfThisComponent.description;
        this.updateProteinDB();
      }
    });
  }

  onAccept() {
    if (this.protDBDataObject.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.protDBDataObject.name = '';
    } else if (this.protDBDataObject.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      this.dataItemOfThisComponent.displayName = this.protDBDataObject.name;
      this.dataService.updateNode(this.dataItemOfThisComponent);
    }
  }

  removeProteinDB() {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }

  updateProteinDB(): void {
    this.dataService.updateFastaData(
      this.protDBDataObject,
      this.dataItemOfThisComponent
    );
  }
}
