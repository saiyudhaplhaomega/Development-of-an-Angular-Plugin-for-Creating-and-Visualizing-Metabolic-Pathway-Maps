import {Component, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-delete-warning-dialog',
  templateUrl: './delete-warning-dialog.component.html',
  styleUrls: ['./delete-warning-dialog.component.css']
})
export class DeleteWarningDialogComponent {

  prompt: string;
  nodeNames: string[];

  constructor(public dialogRef: MatDialogRef<DeleteWarningDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { dialogPrompt: string, nodeNames: string[] }) {
    this.prompt = data.dialogPrompt;
    this.nodeNames = data.nodeNames;
  }

  onDelete(command: string): void {
    this.dialogRef.close(command);
  }

}
