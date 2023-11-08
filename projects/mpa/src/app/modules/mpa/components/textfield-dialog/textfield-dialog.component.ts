import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

/**
 * Reusable textfield component
 * intended for name-editing, description editing etc with variable Validators to check for certain patterns etc.
 */
@Component({
  selector: 'app-textfield-dialog',
  templateUrl: './textfield-dialog.component.html',
  styleUrls: ['./textfield-dialog.component.css'],
})
export class TextfieldDialogComponent implements OnInit {
  @Input() value: string;

  valueLabel: string = 'Edit';
  dialogPrompt: string = 'default dialog prompt';
  maxLength: number = 24;
  hasValidators: boolean = false;
  validatorPattern: string = '[äÄöÖüÜa-zA-Z0-9_-]*';

  valueForm: UntypedFormGroup;
  buttonDisabled: boolean = false;

  constructor(public dialogRef: MatDialogRef<TextfieldDialogComponent>,
    private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    let valueField: [any] = [this.value];
    this.hasValidators ? valueField.push([Validators.required,Validators.pattern(this.validatorPattern)]) : {};
    this.valueForm = this.fb.group({
      valueField
    });
    this.valueForm.statusChanges.subscribe(() => {
      this.validateSubmission();
    })
  }

  onSubmit(): void {
    this.dialogRef.close(this.valueForm.get('valueField').value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getErrorMessage(): string {
    if (this.hasValidators && this.valueForm.get('valueField').hasError('required')) {
      return 'Please input a ' + this.valueLabel;
    } else if (this.hasValidators && this.valueForm.get('valueField').hasError('pattern')) {
      return 'No white spaces or special chars'
    } else if (this.hasValidators && this.valueForm.get('valueField').value.length > this.maxLength) {
      return this.valueLabel + ' is too long!';
    } else {
      console.log(this.valueForm.get('valueField').errors)
      return '';
    }
  }

  validateSubmission(): void {
    if (this.valueForm.status != "VALID") {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }

  }
}
