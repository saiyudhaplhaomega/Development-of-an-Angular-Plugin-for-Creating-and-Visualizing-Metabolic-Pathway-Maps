import {Component, OnInit} from '@angular/core';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import { MatDialogRef } from "@angular/material/dialog";
import {Router} from "@angular/router";
import { AuthGuard } from '../../../core/services/auth-guard.service';



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

  progress: number;

  constructor(private _uploadProgressService: UploadProgressService, private router: Router, public dialogRef: MatDialogRef<ProphaneJobSubmissionDialogComponent>, private authGuard: AuthGuard) {

  }

  ngOnInit(){
    this._uploadProgressService.currentProgress.subscribe(progress => this.progress = progress);
  }

  closeAndRedirect(){
    this.dialogRef.close();
    if (this.authGuard.allowExpert()){
      this.router.navigate(['./prophanejobcontrol']);
    }
    else {
      this.router.navigate(['./login']);
    }
  }

}


