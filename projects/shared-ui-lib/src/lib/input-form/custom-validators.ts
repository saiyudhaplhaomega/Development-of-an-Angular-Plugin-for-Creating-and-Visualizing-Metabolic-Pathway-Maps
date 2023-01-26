import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export class CustomValidators {
  static conditionalValidator(
    condition: () => any,
    validator: any
  ): (formControl: AbstractControl) => ValidationErrors {
    return (formControl: AbstractControl<any, any>) => {
      if (condition()) {
        return validator(formControl);
      }
      return null;
    };
  }

  static updateValidators(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (
        abstractControl instanceof FormGroup ||
        abstractControl instanceof FormArray
      ) {
        this.updateValidators(abstractControl);
      } else {
        abstractControl.updateValueAndValidity();
      }
    });
  }

  static getErrorMessage(formControl: AbstractControl): string {
    const error = Object.keys(formControl.errors)[0];

    switch (error) {
      case 'required':
        return 'please enter something';
      case 'pattern':
        return 'allowed chars: a-z0-9._-';
      case 'email':
        return 'this is not an e-mail';
      case 'minlength':
        return 'please provide more chars';
      case 'maxlength':
        return 'please provide less chars';
      case 'min':
        return 'please provide a higher value';
      case 'max':
        return 'please prvide a lower value';
    }
  }
}
