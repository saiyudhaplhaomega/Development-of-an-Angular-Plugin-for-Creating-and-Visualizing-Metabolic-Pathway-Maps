import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from 'shared-lib';
import { OFSData } from '../../../models/ofs-data.model';
import { PreprocessingConfigForm } from '../../../models/preprocessing.model';
import { WorkflowService } from '../../../services/workflow.service';

@Component({
  selector: 'ofs-preprocessing-input',
  templateUrl: './preprocessing-input.component.html',
  styleUrls: ['./preprocessing-input.component.scss'],
})
export class PreprocessingInputComponent
  extends InputFormComponent
  implements OnInit, OnDestroy
{
  formModel: PreprocessingConfigForm;

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);

    this.subscriptions = [];
  }

  //  Life Cycle Hooks
  ngOnInit(): void {
    this.formModel = this.buildForm();
    this.doSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  //  Getters and Setters
  get controlGroupName(): string {
    return this.workflow.ofsData.responseData.overviewResponse.controlGroup;
  }

  get testGroupOptions(): Readonly<string[]> {
    return this.workflow.ofsData.responseData.overviewResponse.testGroups;
  }

  //  Methods
  doSubscriptions() {
    this.subscriptions.push(
      this.workflow.ofsData$.subscribe((ofsData) => {
        this.setExistingFormInput(ofsData);
      })
    );
  }

  buildForm() {
    const formModel = this.builder.group(
      {
        controlGroup: new FormControl('control'),
        testGroup: ['test'],
        repeats: [10000, [Validators.required, Validators.min(0)]],
        folds: [5, [Validators.required, Validators.min(0)]],
      },
      {
        updateOn: 'blur',
      }
    ) as PreprocessingConfigForm;

    return formModel;
  }

  setExistingFormInput(ofsData: OFSData) {
    if (ofsData.configData.preprocessingConfig?.testGroup !== undefined) {
      //  yes: update form values and disable changes
      this.formModel.patchValue(ofsData.configData.preprocessingConfig);
      this.disableForm();
      return;
    }
    // no: allow changes of form
    this.enableForm();
    this.formModel.get('controlGroup').disable();
  }

  submitPreprocessingConfig() {
    const preprocessingConfig = this.formModel.getRawValue();
    this.workflow.submitPreprocessingConfig(preprocessingConfig);
  }
}
