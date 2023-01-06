import {Component, Input} from '@angular/core';
import {UntypedFormControl, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-textfield-dialog',
  templateUrl: './textfield-dialog.component.html',
  styleUrls: ['./textfield-dialog.component.css']
})
export class TextfieldDialogComponent {

  @Input() description: string; dialogPrompt: string;

  nameFormControl = new UntypedFormControl('', [
    Validators.pattern('\w*'),
  ]);

  constructor(
    public dialogRef: MatDialogRef<TextfieldDialogComponent>
  ) {}

  onSubmitDescription(): void {
    this.dialogRef.close(this.description);
  }

}
