import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DataService2, NodeType} from '../../../data-navigation-tree/services/data2.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { DataItem } from '../../../data-navigation-tree/objects/data-item';

@Component({
  selector: 'app-compare-experiments-dialog-component',
  templateUrl: './compare-experiments-dialog-component.component.html',
  styleUrls: ['./compare-experiments-dialog-component.component.scss']
})
export class CompareExperimentsDialogComponentComponent implements OnInit {
  firstExperiment: string;
  firstExperimentId: string;

  secondExperiment: string;
  secondExperimentId: string;

  compExpNameForm: UntypedFormGroup;
  comparisonExperimentName: string;

  listOfExperiments: string[] = [];
  experimentsMap: Map<string, string>;
  
  //maybe only status needed, converted to boolean where needed? AND enum?
  comparisonFailed: boolean = false;
  status: string = "unsubmitted";
  submitDisabled: boolean = true;
  errorMessage: string;

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
    this.experimentsMap.forEach((value, key) => {
      if (key != this.data.expName) {
        this.listOfExperiments.push(key);
      }
    })
    this.initializeDefaults();

    this.compExpNameForm = this.fb.group({
      comparisonExperimentName: [
        '',
        [
          Validators.required,
          Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
        ],
      ],
    });
    this.compExpNameForm.statusChanges.subscribe(() => {
      this.validateSubmits();
    })

  }

  // used in the "goBack"-button after submission failed and in ngOnInit
  initializeDefaults() {
    if (this.data.expName == null){
      this.firstExperiment = this.listOfExperiments[0];
      this.firstExperimentId = this.experimentsMap.get(this.firstExperiment);
      this.secondExperiment = this.listOfExperiments[1];
    } else {
      this.firstExperiment = this.data.expName;
      this.firstExperimentId = this.data.expID;
      this.secondExperiment = this.listOfExperiments[0];
    }
    this.secondExperimentId = this.experimentsMap.get(this.secondExperiment);
    this.status = "unsubmitted";
    this.errorMessage = '';
  }

  selectedExperimentChange(newSelection: string, expToChange: string): void {
    if (expToChange == "first") {
      this.firstExperiment = newSelection;
      this.firstExperimentId = this.experimentsMap.get(this.firstExperiment);
    } else {
    this.secondExperiment = newSelection;
    this.secondExperimentId = this.experimentsMap.get(this.secondExperiment);
    }
    this.validateSubmits();
  }

  submitCompareExperiments(): void {
    this.status="loading";
    this.dataService.getExperimentData(this.firstExperimentId).subscribe(exp1 => {
      this.dataService.getExperimentData(this.secondExperimentId).subscribe(exp2 => {
        this.status = "submitted";
        if(exp1.isSearched && exp2.isSearched) {
          // const compareExperimentList: string[] = [this.firstExperimentId, this.secondExperimentId];
          // const nodeObject: DataItem = this.dataService.createNewDataItem(this.data.parentFolderDataObject, this.compExpNameForm.value.comparisonExperimentName, NodeType.ExperimentComparison, compareExperimentList);
        } else{
          this.comparisonFailed = true;
          this.errorMessage = "No uploaded data in ";
          !exp1.isSearched ? this.errorMessage += exp1.name+" " : '';
          !exp2.isSearched ? this.errorMessage += ","+exp2.name : '';
        }
      })
    })
  }

  getErrorMessage(): string {
    if (this.compExpNameForm.get('comparisonExperimentName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.compExpNameForm.get('comparisonExperimentName').hasError('pattern')) {
      return 'no white spaces or special chars';
    } else {
      return '';
    }
  }

  //TODO is there a better/more efficient way to handle this without constantly checking if else?
  validateSubmits(): void {
    if ( this.compExpNameForm.status != "VALID"|| this.firstExperimentId == this.secondExperimentId) {
      this.submitDisabled = true;
      this.errorMessage = (this.firstExperimentId == this.secondExperimentId) ? "select distinct experiments" : '';
    } else if (this.firstExperimentId && this.secondExperimentId) {
      this.submitDisabled = false;
      this.errorMessage = "";
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.comparisonFailed);
  }
}
