import { Component, OnInit } from '@angular/core';
import { ContentComponent } from '../../mpa.component';
import { DataService } from '../../services/data.service';
import { DataItem } from '../../model/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../textfield-dialog/textfield-dialog.component';
import { MpaTableDataService } from '../../services/mpa-table-data.service';
import { ExperimentJSONObject } from '../../model/experimentjson';

@Component({
  selector: 'app-experiment-comparison',
  templateUrl: './experiment-comparison.component.html',
  styleUrls: ['./experiment-comparison.component.scss']
})
export class ExperimentComparisonComponent implements OnInit,ContentComponent {

  dataItemOfThisComponent: DataItem;

  // placeholder data
  hasMpaData: boolean = false;
  hasTaxonomyData: boolean = false;
  hasFunctionData: boolean = false;
  displayNameEditing: string;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private mpaTableDataService: MpaTableDataService,
    private dialog: MatDialog,) {}

  ngOnInit() {
    this.mpaTableDataService.expID.next(this.dataItemOfThisComponent.uuid);
    this.displayNameEditing = this.dataItemOfThisComponent.displayName;

    this.dataService.getExperimentData(this.dataItemOfThisComponent.uuid).subscribe((experimentData: ExperimentJSONObject) => {
      //this.experimentDataObject = experimentData;
      if (experimentData.isSearched) {
        this.hasMpaData = true;
        this.mpaTableDataService.requestProteinGroups();
      } else {
        this.hasMpaData = false;
      }
    });
  }

  onSetDescription(): void {
    /**
     * handles description change
     */
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment description';
    dialogInstance.value = this.dataItemOfThisComponent.description;

    dialogRef.afterClosed().subscribe((expDescription) => {
      this.dataItemOfThisComponent.description = expDescription;
      this.updateExperiment();
    });
  }

  onAccept(): void {
    if (this.displayNameEditing.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.displayNameEditing = '';
    } else if (this.displayNameEditing.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      this.updateExperiment();
    }
  }

  updateExperiment(): void {
    this.dataItemOfThisComponent.displayName = this.displayNameEditing;
    if (this.dataItemOfThisComponent.uuid) {
      this.dataService.updateExperiment(this.dataItemOfThisComponent);
    }
  }

  onRemoveExperiment(): void {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }
}
