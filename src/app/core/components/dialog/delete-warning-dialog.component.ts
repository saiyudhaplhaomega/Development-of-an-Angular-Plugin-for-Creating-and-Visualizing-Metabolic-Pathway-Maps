import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.css']
})
export class DeleteWarningDialogComponent {

  private prompt: string;
  private nodeName: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dialogPrompt: string, nodeName: string }) {

    this.prompt = data.dialogPrompt;
    this.nodeName = data.nodeName;
  }

  onDelete(command: string): void {
    this.dialogRef.close(command);
  }

}
