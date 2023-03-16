import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { InputFormComponent } from 'shared-lib';
import { Endpoints } from '../../../models/endpoints.model';
import { PreprocessingConfigForm } from '../../models/preprocessing.model';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-preprocessing-input',
  templateUrl: './preprocessing-input.component.html',
  styleUrls: ['./preprocessing-input.component.scss'],
})
export class PreprocessingInputComponent
  extends InputFormComponent
  implements OnInit
{
  @Output() submit = new EventEmitter<any>();

  formModel: FormGroup;

  controlGroupName: string;
  testGroupOptions: string[];

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);
    this.formDisabled$ = new BehaviorSubject<Boolean>(false);
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.controlGroupName =
      this.workflow.ofsData.responseData.overviewResponse.controlGroup;
    this.testGroupOptions =
      this.workflow.ofsData.responseData.overviewResponse.testGroups;

    this.formModel = this.buildForm();
    this.setExistingFormInput();
    this.doSubscriptions();

    this.formModel.get('controlGroup').disable();
  }

  buildForm() {
    const formModel = this.builder.group(
      {
        controlGroup: new FormControl(this.controlGroupName),
        testGroup: [this.testGroupOptions[0]],
        repeats: [5000, [Validators.required, Validators.min(0)]],
        folds: [5000, [Validators.required, Validators.min(0)]],
      },
      {
        updateOn: 'blur',
      }
    ) as PreprocessingConfigForm;

    return formModel;
  }

  setExistingFormInput() {
    if (
      this.workflow.ofsData.configData.preprocessingConfig?.testGroup !==
      undefined
    ) {
      this.formModel.patchValue(
        this.workflow.ofsData.configData.preprocessingConfig
      );
      this.disableForm();
    }
  }

  submitPreprocessingConfig() {
    this.disableForm();
    const preprocessingConfig = this.formModel.getRawValue();
    this.workflow.submitConfig(
      preprocessingConfig,
      Endpoints.PREPROCESSING_INPUT
    );
    this.submit.emit();
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }

  doSubscriptions() {
    this.subscriptions.push(
      this.formDisabled$.subscribe((disabled) => {
        disabled ? this.formModel.disable() : this.formModel.enable();
      })
    );
  }
}
