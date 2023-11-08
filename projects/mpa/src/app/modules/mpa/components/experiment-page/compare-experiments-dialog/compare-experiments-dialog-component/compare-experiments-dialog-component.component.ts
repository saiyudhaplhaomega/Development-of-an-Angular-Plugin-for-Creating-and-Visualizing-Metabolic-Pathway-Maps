import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { DataService, NodeType } from '../../../../services/data.service';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataItem } from '../../../../model/data-item';
import { ExperimentJSONObject } from '../../../../model/experimentjson';

export enum DialogStatus {
  UNSUBMITTED = "unsubmitted",
  LOADING = "loading",
  SUBMITTED = "submitted", //currently not used, may be useless in this scenario
  FAILED = "failed",
  SUCCESS = "success"
}
@Component({
  selector: 'app-compare-experiments-dialog-component',
  templateUrl: './compare-experiments-dialog-component.component.html',
  styleUrls: ['./compare-experiments-dialog-component.component.scss']
})
export class CompareExperimentsDialogComponentComponent implements OnInit {
  compExpNameForm: UntypedFormGroup;
  comparisonExperimentName: string;


  availableExperimentsNames: string[];
  availableExperiments: Map<string, string>;
  experimentsForm: FormControl;

  //maybe only status needed, converted to boolean where needed? AND enum?
  status: DialogStatus;
  submitDisabled: boolean = false;
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<CompareExperimentsDialogComponentComponent>,
    private dataService: DataService,
    private fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { parentFolderDataObject: DataItem, expName?: string, expID?: string },
  ) {}

  ngOnInit(): void {
    this.availableExperimentsNames = [];
    this.availableExperiments = this.dataService.getExperimentsMap();
    this.availableExperiments.forEach((expid, key) => {
      this.availableExperimentsNames.push(key)
    })
    this.experimentsForm = new FormControl([]);
    this.experimentsForm.valueChanges.subscribe(() => {
      this.validateSubmits();
    })
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
    this.initializeDefaults();
  }

  // used in the "goBack"-button after submission failed and in ngOnInit
  initializeDefaults() {
    this.status = DialogStatus.UNSUBMITTED;
    this.errorMessage = '';
    if (this.data.expName) {
      this.experimentsForm.setValue([this.data.expName]);
    }
  }

  submitCompareExperiments() {
    this.status = DialogStatus.LOADING;
    let selectedExperimentsNames: string[] = this.experimentsForm.value
    let selectedExperimentsIDs: string[] = [];
    let responses: ExperimentJSONObject[] = [];
    for (let i = 0; i < selectedExperimentsNames.length; i++) {
      selectedExperimentsIDs.push(this.availableExperiments.get(selectedExperimentsNames[i]))
      this.dataService.getExperimentData(selectedExperimentsIDs[i]).subscribe(res => {
        responses.push(res);
        if(responses.length == selectedExperimentsIDs.length){
          for(let i in responses) {
            if (!responses[i].isSearched) {
              this.status = DialogStatus.FAILED;
              this.errorMessage.length > 1 ? this.errorMessage += ", " + responses[i].name : this.errorMessage += "No data uploaded in " + responses[i].name;
            }
          }
          this.status == DialogStatus.FAILED ? {} : this.createNewComparisonNode(selectedExperimentsIDs);
        }
      })
    }
  }
  createNewComparisonNode(selectedExperimentsIDs: string[]) {
    const nodeObject: DataItem = this.dataService.createNewDataItem(this.data.parentFolderDataObject, this.compExpNameForm.value.comparisonExperimentName, NodeType.ExperimentComparison, selectedExperimentsIDs);
    this.dataService.getExperimentData(nodeObject.uuid).subscribe(res => {
      //TODO is this right? does comparison also get set to isSearched = true?
      res.isSearched ? this.status = DialogStatus.SUCCESS : this.status = DialogStatus.FAILED;
    })
  }

  //errorMessage for the name form
  getNameErrorMessage(): string {
    if (this.compExpNameForm.get('comparisonExperimentName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.compExpNameForm.get('comparisonExperimentName').hasError('pattern')) {
      return 'No white spaces or special chars';
    } else {
      return '';
    }
  }

  //enables/disables submit button and sends back an errorMessage
  validateSubmits(): void {
    if (this.compExpNameForm.status != "VALID"|| this.experimentsForm.value.length < 2) {
      this.submitDisabled = true;
    } else if (this.experimentsForm.value.length > 1 && this.compExpNameForm.status == "VALID") {
      this.submitDisabled = false;
      this.errorMessage = "";
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.status == DialogStatus.SUCCESS ? true : false);
  }
}
