import {Component, Inject, OnInit} from '@angular/core';
import {UploadProgressService} from '../../services/upload-progress.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthGuard} from '../../services/auth-guard.service';


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
  noRedirect: boolean;
  successMessage: string;
  uploadFailedMessage: string;

  constructor(private _uploadProgressService: UploadProgressService,
              private router: Router,
              public dialogRef: MatDialogRef<UploadDialogComponent>,
              private authGuard: AuthGuard,
              @Inject(MAT_DIALOG_DATA) public data: {noRedirect: boolean; successMessage: string; uploadFailedMessage: string}) {

    data.noRedirect ? this.noRedirect = data.noRedirect : this.noRedirect = false;
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
    this.dialogRef.close();
  }

  closeAndRedirect() {
    this.dialogRef.close();
    if (!this.noRedirect) {
      // option to redirect to prophane results
      if (this.authGuard.allowExpert()) {
        this.router.navigate(['./prophanejobcontrol']);
      } else {
        this.router.navigate(['./results/' + this.jobUuid]);
      }
    }
  }

  retryUpload() {
    // TODO: handle this !!
  }

}


