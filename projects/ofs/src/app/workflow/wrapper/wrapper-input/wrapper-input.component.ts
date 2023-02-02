import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { InputFormComponent } from 'shared-ui-lib';
import { WrapperForm } from '../../models/wrapper.model';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-wrapper-input',
  templateUrl: './wrapper-input.component.html',
  styleUrls: ['./wrapper-input.component.scss'],
})
export class WrapperInputComponent
  extends InputFormComponent
  implements OnInit
{
  @Output() submit = new EventEmitter<any>();

  formModel: FormGroup;

  pvalPreselection: number = 0.01;

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);
    this.formDisabled$ = new BehaviorSubject<Boolean>(false);
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.formModel = this.buildForm();
    this.setExistingFormInput();
    this.doSubscriptions();
  }

  buildForm() {
    const formModel = this.builder.group({
      repeats: [5000, [Validators.required, Validators.min(0)]],
      folds: [5000, [Validators.required, Validators.min(0)]],
    }) as WrapperForm;
    return formModel;
  }

  setExistingFormInput() {
    if (this.workflow.wrapperConfig) {
      this.formModel.patchValue(this.workflow.wrapperConfig);
      this.disableForm();
    }
  }

  doSubscriptions() {
    this.subscriptions.push(
      this.formDisabled$.subscribe((disabled) => {
        disabled ? this.formModel.disable() : this.formModel.enable();
      })
    );
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }

  submitWrapperConfig() {
    this.disableForm();
    const wrapperConfig = this.formModel.getRawValue();
    this.workflow.submitWrapperInput(wrapperConfig);
    this.submit.emit();
  }
}
