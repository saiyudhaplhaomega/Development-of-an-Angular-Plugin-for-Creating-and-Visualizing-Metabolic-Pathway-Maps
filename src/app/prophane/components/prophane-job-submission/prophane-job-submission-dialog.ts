import {Component, OnInit} from '@angular/core';
import {UploadProgressService} from '../../../core/services/upload-progress.service';


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

  constructor(private _uploadProgressService: UploadProgressService) {

  }

  ngOnInit(){
    this._uploadProgressService.currentProgress.subscribe(progress => this.progress = progress);
  }

}
