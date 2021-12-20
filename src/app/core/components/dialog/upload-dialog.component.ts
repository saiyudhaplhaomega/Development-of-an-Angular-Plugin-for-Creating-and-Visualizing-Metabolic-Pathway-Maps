import {Component, Inject, OnInit} from '@angular/core';
import {UploadProgressService} from '../../services/upload-progress.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  proteinreportfilename: string;
  fastafilename: string;
  fastaprogress: number;
  csvprogress: number;
  jobUuid: string;
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
})

export class UploadDialogComponent implements OnInit {

  progress: number;
  uploadFailedBoolean = false;
  jobUuid: string;
  successMessage: string;
  uploadFailedMessage: string;

  constructor(private _uploadProgressService: UploadProgressService,
              public dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {successMessage: string; uploadFailedMessage: string}) {

    data.successMessage ? this.successMessage = data.successMessage : this.successMessage = 'Upload successful!';
    data.uploadFailedMessage ? this.uploadFailedMessage = data.uploadFailedMessage : this.uploadFailedMessage = 'Upload failed';

  }

  ngOnInit() {
    this._uploadProgressService.currentProgress.subscribe(progress => this.progress = progress);
    this.jobUuid = this._uploadProgressService.getUUID();
  }

  public setUploadFailed() {
    this.uploadFailedBoolean = true;
  }

  closeDialog() {
    this.dialogRef.close(this.uploadFailedBoolean);
  }

  retryUpload() {
    // TODO: handle this !!
  }

}


