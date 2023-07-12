import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService2 } from '../../../data-navigation-tree/services/data2.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

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

    this.compExpNameForm = this.fb.group({
      newExpName: [
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
    if (this.compExpNameForm.status == "VALID" && this.data.expID != null && this.secondExperimentId != null) {
      //TODO: call back-end, create new experimentComponent
      
    }
  }

  getErrorMessage(): string {
    if (this.compExpNameForm.get('newExpName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.compExpNameForm.get('newExpName').hasError('pattern')) {
      return 'no white spaces or special chars';
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.comparisonFailed);
  }
}