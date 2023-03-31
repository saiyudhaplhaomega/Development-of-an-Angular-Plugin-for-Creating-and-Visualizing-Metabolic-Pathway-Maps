import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'shared-input-form',
  template: ` <p>Please implement Your inputs here</p> `,
})
export class InputFormComponent {
  @Output() submit = new EventEmitter<any>();

  public formModel: FormGroup;
  // TODO: remove formDisabled behaviorsubject
  public formDisabled$: BehaviorSubject<Boolean>;
  public subscriptions: Subscription[];

  constructor(public builder: FormBuilder) {}

  public getErrorMessage(control: AbstractControl): string {
    if (control.invalid) {
      return CustomValidators.getErrorMessage(control);
    }
    return '';
  }

  public disableForm() {
    this.formDisabled$.next(true);
    this.formModel.disable();
  }

  public enableForm() {
    this.formDisabled$.next(false);
    this.formModel.enable();
  }
}
