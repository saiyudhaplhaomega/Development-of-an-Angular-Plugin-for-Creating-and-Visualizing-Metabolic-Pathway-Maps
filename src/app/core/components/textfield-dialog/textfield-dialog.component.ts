import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-textfield-dialog',
  templateUrl: './textfield-dialog.component.html',
  styleUrls: ['./textfield-dialog.component.css']
})
export class TextfieldDialogComponent {

  @Input() description: string; dialogPrompt: string;

  nameFormControl = new FormControl('', [
    Validators.pattern('\w*'),
  ]);
  matcher = new ErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<TextfieldDialogComponent>
  ) {}

  onSubmitDescription(): void {
    this.dialogRef.close(this.description);
  }

}
