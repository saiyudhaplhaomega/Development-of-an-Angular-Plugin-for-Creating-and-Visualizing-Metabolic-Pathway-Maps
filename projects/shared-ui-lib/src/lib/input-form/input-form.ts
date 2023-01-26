import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'ui-input-form',
  template: ` <p>Please implement Your inputs here</p> `,
})
export class InputFormComponent {
  public validatorSubscription?: Subscription;

  constructor(public builder: FormBuilder) {}

  public getErrorMessage(control: AbstractControl): string {
    if (control.invalid) {
      return CustomValidators.getErrorMessage(control);
    }
    return '';
  }
}
