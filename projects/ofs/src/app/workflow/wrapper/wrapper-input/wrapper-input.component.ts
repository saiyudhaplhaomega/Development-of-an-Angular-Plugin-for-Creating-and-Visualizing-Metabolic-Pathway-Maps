import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { InputFormComponent } from 'shared-lib';
import { WrapperForm } from '../../models/wrapper.model';
import { WorkflowService } from '../../services/workflow.service';
import { OFSData } from '../../models/ofs-data.model';

@Component({
  selector: 'ofs-wrapper-input',
  templateUrl: './wrapper-input.component.html',
  styleUrls: ['./wrapper-input.component.scss'],
})
export class WrapperInputComponent
  extends InputFormComponent
  implements OnInit
{
  formModel: WrapperForm;

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);
    this.subscriptions = [];
  }

  // Life Cycle Hooks
  ngOnInit(): void {
    this.formModel = this.buildForm();
    this.doSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  //  Subscriptions
  doSubscriptions() {
    // form depends on values in ofsdata - react to changes
    this.subscriptions.push(
      this.workflow.ofsData$.subscribe((ofsData) => {
        this.setExistingFormInput(ofsData);
      })
    );
  }

  // Methods
  // check if ofsdata contains values relevant to this form
  setExistingFormInput(ofsData: OFSData) {
    const wrapperConfig = ofsData.configData.wrapperConfig;
    if (
      wrapperConfig?.folds !== undefined &&
      wrapperConfig?.repeats !== undefined &&
      wrapperConfig.folds !== 0
    ) {
      //  yes: update form values and disable changes
      this.formModel.patchValue(wrapperConfig);
      this.disableForm();
      return;
    }
    // no: allow changes of form
    this.enableForm();
  }

  buildForm() {
    const formModel = this.builder.group({
      pvalCutoff: [0.0001, [Validators.required, Validators.min(0)]],
      repeats: [1000, [Validators.required, Validators.min(0)]],
      folds: [5, [Validators.required, Validators.min(0)]],
    }) as WrapperForm;
    return formModel;
  }

  submitWrapperConfig() {
    const wrapperConfig = this.formModel.getRawValue();
    this.workflow.submitWrapperConfig(wrapperConfig);
  }
}
