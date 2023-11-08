import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './name-edit-dialog.component.html',
  styleUrls: ['./name-edit-dialog.component.css'],
})
export class NameEditDialogComponent implements OnInit {
  @Input() dialogPrompt: string;

  folderNameForm: UntypedFormGroup;
  existingNodeNames: string[];
  textFieldLabel: string;

  constructor(
    public dialogRef: MatDialogRef<NameEditDialogComponent>,
    private fb: UntypedFormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.existingNodeNames = this.dataService.getExistingNodeNames();
    this.folderNameForm = this.fb.group({
      folderName: [
        '',
        [
          Validators.required,
          Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
          NodeNameValidator(this.existingNodeNames),
        ],
      ],
    });
  }

  getErrorMessage(): string {
    if (this.folderNameForm.get('folderName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.folderNameForm.get('folderName').hasError('pattern')) {
      return 'no white spaces or special chars';
    } else if (
      this.folderNameForm.get('folderName').hasError('forbiddenName')
    ) {
      return 'name already in use';
    }
  }

  onSubmitName(): void {
    this.dialogRef.close(this.folderNameForm.value.folderName);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}

export function NodeNameValidator(existingNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let forbidden = false;
    for (const name of existingNames) {
      if (control.value === name) {
        forbidden = true;
      }
    }
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
