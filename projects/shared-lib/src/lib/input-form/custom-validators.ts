import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const ALLOWEDLETTERCHARS = '^[a-zA-Z]*$';
export const ALLOWEDSIMPLECHARS = '^[a-zA-Z0-9_.-]*$';

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

  static arrayDuplicateValidator(controlNames: string[]): ValidatorFn {
    return (form: FormArray) => {
      const controls = [];

      form.controls.forEach((group: FormGroup) => {
        controlNames.forEach((name) => {
          controls.push(group.get(name));
        });
      });

      for (let valueIndex = 0; valueIndex < controls.length; valueIndex++) {
        for (
          let otherValueIndex = valueIndex + 1;
          otherValueIndex < controls.length;
          otherValueIndex++
        ) {
          if (controls[valueIndex].value == controls[otherValueIndex].value) {
            controls.forEach((control) =>
              control.setErrors({ duplicate: true })
            );
            return { duplicate: true };
          }
        }
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
        console.log(key);
        console.log(abstractControl.status);
        abstractControl.updateValueAndValidity({ emitEvent: false });
      }
    });
  }

  static getErrorMessage(formControl: AbstractControl): string {
    const error = Object.keys(formControl.errors)[0];

    switch (error) {
      case 'required':
        return 'please enter something';
      case 'pattern':
        return 'allowed chars: a-zA-Z0-9._-';
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
      case 'duplicate':
        return 'this field contains a duplicate value';
    }
  }
}
