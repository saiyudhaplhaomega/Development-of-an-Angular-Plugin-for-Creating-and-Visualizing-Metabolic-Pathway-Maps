import {Component, OnInit, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {DataService} from '../../../mpa/components/data-navigation-tree/services/data.service';
import {DataItem} from '../../../mpa/components/data-navigation-tree/objects/data-item';

@Component({
  selector: 'app-dialog',
  templateUrl: './name-edit-dialog.component.html',
  styleUrls: ['./name-edit-dialog.component.css']
})

  export class NameEditDialogComponent implements OnInit {

  @Input() dialogPrompt: string;

  folderNameForm: FormGroup;
  existingNodeNames: string[];
  private _dataMap: Map<string, DataItem>;
  textFieldLabel: string;

  constructor(
    public dialogRef: MatDialogRef<NameEditDialogComponent>,
    private fb: FormBuilder,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });

    this.existingNodeNames = [];

    for (const [key, value] of this._dataMap.entries()) {
      this.existingNodeNames.push(value.displayName);
    }

    this.folderNameForm = this.fb.group({
      folderName: ['', [
        Validators.required,
        Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
        folderNameValidator(this.existingNodeNames)
      ]]
    });
  }

  getErrorMessage() {
    if (this.folderNameForm.get('folderName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.folderNameForm.get('folderName').hasError('pattern')) {
      return 'no white spaces or special chars';
    } else if (this.folderNameForm.get('folderName').hasError('forbiddenName')) {
      return 'name already in use';
    }
  }

  onSubmitName(): void {
    // console.log(this.folderNameForm.value, this.folderNameForm.valid);
    this.dialogRef.close(this.folderNameForm.value.folderName);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

}

export function folderNameValidator(existingNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let forbidden = false;
    for (const name of existingNames) {
      // console.log(existingNames);
      if (control.value === name) {
        forbidden = true;
      }
    }
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
