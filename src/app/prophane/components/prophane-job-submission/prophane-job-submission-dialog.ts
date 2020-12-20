import {Component} from '@angular/core';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthGuard} from '../../../core/services/auth-guard.service';


export interface DialogData {
  proteinreportfilename: string;
  fastafilename: string;
  fastaprogress: number;
  csvprogress: number;
  jobUuid: string;
}

@Component({
  selector: 'prophane-job-submission-dialog',
  templateUrl: './prophane-job-submission-dialog.html',
  styleUrls: ['./prophane-job-submission-dialog.css'],
})

export class ProphaneJobSubmissionDialogComponent {

  progress: number;
  uploadFailedBoolean = false;
  jobUuid: string;

  constructor(private _uploadProgressService: UploadProgressService,
              private router: Router, public dialogRef: MatDialogRef<ProphaneJobSubmissionDialogComponent>, private authGuard: AuthGuard) {
    // empty constructor
  }

  ngOnInit() {
    this._uploadProgressService.currentProgress.subscribe(progress => this.progress = progress);
    this.jobUuid = this._uploadProgressService.getUUID();
  }


  public setUploadFailed() {
    this.uploadFailedBoolean = true;
  }

  closeAndRedirect() {
    this.dialogRef.close();
    if (this.authGuard.allowExpert()) {
      this.router.navigate(['./prophanejobcontrol']);
    } else {
      this.router.navigate(['./results/' + this.jobUuid]);
    }
  }

  retryUpload() {
    // TODO: handle this !!
  }

}


