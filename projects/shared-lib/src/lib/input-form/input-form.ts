import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'shared-input-form',
  template: ` <p>Please implement Your inputs here</p> `,
})
export class InputFormComponent {
  @Output() submit = new EventEmitter<any>();

  public formModel: FormGroup;
  public formDisabledSubject$ = new BehaviorSubject<boolean>(false);
  public subscriptions: Subscription[];

  constructor(public builder: FormBuilder) {}

  get formDisabled$(): Observable<boolean> {
    return this.formDisabledSubject$;
  }

  public getErrorMessage(control: AbstractControl): string {
    if (control.invalid) {
      return CustomValidators.getErrorMessage(control);
    }
    return '';
  }

  public disableForm() {
    this.formDisabledSubject$.next(true);
    this.formModel.disable();
  }

  public enableForm() {
    this.formDisabledSubject$.next(false);
    this.formModel.enable();
  }
}
