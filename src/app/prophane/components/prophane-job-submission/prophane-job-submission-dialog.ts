import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  proteinreportfilename: string;
  fastafilename: string;
  fastaprogress: number;
  csvprogress: number;
}

@Component({
  selector: 'prophane-job-submission-dialog',
  templateUrl: './prophane-job-submission-dialog.html',
  styleUrls: ['./prophane-job-submission-dialog.css'],
})

export class ProphaneJobSubmissionDialogComponent {

  progressData: DialogData;

  constructor(
    public dialogRef: MatDialogRef<ProphaneJobSubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.progressData = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
