import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService2, NodeType } from '../../../data-navigation-tree/services/data2.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataItem } from '../../../data-navigation-tree/objects/data-item';

@Component({
  selector: 'app-compare-experiments-dialog-component',
  templateUrl: './compare-experiments-dialog-component.component.html',
  styleUrls: ['./compare-experiments-dialog-component.component.scss']
})
export class CompareExperimentsDialogComponentComponent implements OnInit {

  secondExperiment: string;
  secondExperimentId: string;

  compExpNameForm: UntypedFormGroup;

  comparisonFailed: boolean = false;
  listOfExperiments: string[] = [];
  experimentsMap: Map<string, string>;
  comparisonExperimentName: string;

  constructor(
    public dialogRef: MatDialogRef<CompareExperimentsDialogComponentComponent>,
    private dataService: DataService2,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { parentFolderDataObject: DataItem, expName?: string, expID?: string },
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

    this.compExpNameForm = this.fb.group({
      comparisonExperimentName: [
        '',
        [
          Validators.required,
          Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
        ],
      ],
    });
  }

  selectedExperimentChange(newSelection: string): void {
    this.secondExperiment = newSelection;
    this.secondExperimentId = this.experimentsMap.get(this.secondExperiment);
  }

  submitCompareExperiments(): void {
    console.log(this.comparisonExperimentName);
    if (this.compExpNameForm.status == "VALID") {
      const compareExperimentList: string[] = [this.secondExperimentId, this.data.expID];
      const nodeObject: DataItem = this.dataService.createNewDataItem(this.data.parentFolderDataObject, this.compExpNameForm.value.comparisonExperimentName, NodeType.ExperimentComparison, compareExperimentList);
    }
  }

  getErrorMessage(): string {
    if (this.compExpNameForm.get('comparisonExperimentName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.compExpNameForm.get('comparisonExperimentName').hasError('pattern')) {
      return 'no white spaces or special chars';
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.comparisonFailed);
  }
}
