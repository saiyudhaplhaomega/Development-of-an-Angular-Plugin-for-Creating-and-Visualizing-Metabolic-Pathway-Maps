import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService2 } from '../../../data-navigation-tree/services/data2.service';

@Component({
  selector: 'app-compare-experiments-dialog-component',
  templateUrl: './compare-experiments-dialog-component.component.html',
  styleUrls: ['./compare-experiments-dialog-component.component.scss']
})
export class CompareExperimentsDialogComponentComponent implements OnInit {

  secondExperiment: string;
  secondExperimentId: string;
  comparisonFailed: boolean = false;
  listOfExperiments: string[] = [];
  experimentsMap: Map<string, string>;
  comparisonExperimentName: string;

  constructor(
    public dialogRef: MatDialogRef<CompareExperimentsDialogComponentComponent>,
    private dataService: DataService2,
    @Inject(MAT_DIALOG_DATA)
    public data: { expName: string, expID: string },
  ) {

  }

  ngOnInit(): void {
    this.experimentsMap = this.dataService.getExperimentsMap();
    console.log(this.experimentsMap)
    this.experimentsMap.forEach((value, key) => {
      if (key != this.data.expName) {
        this.listOfExperiments.push(key);
      }
    })
    this.secondExperiment = this.listOfExperiments[0];
    this.secondExperimentId = this.experimentsMap.get(this.secondExperiment);
  }

  selectedExperimentChange(newSelection: string): void {
    this.secondExperiment = newSelection;
    this.secondExperimentId = this.experimentsMap.get(this.secondExperiment);
  }

  submitCompareExperiments(): void {
    if (this.comparisonExperimentName != null && this.comparisonExperimentName.length > 0 && this.data.expID != null && this.secondExperimentId != null) {
      //TODO: call back-end, create new experimentComponent
      console.log(this.comparisonExperimentName);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.comparisonFailed);
  }
}
