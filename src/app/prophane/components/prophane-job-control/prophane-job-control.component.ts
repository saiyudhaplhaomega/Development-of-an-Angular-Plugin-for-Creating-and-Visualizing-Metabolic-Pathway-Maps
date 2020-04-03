import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {sortBy} from 'lodash';

@Component({
  selector: 'app-prophane-job-control',
  templateUrl: './prophane-job-control.component.html',
  styleUrls: ['./prophane-job-control.component.css']
})

export class ProphaneJobControlComponent implements OnInit {

  jobs: ProphaneJobObject[];
  isUpdating = false;

  constructor(private jsonUpload: AuthenticatedSerializableObjectUploaderService) {

  }

  ngOnInit(): void {
    this.jobs = undefined;
    this.triggerJobListLoading();
  }

  triggerJobListLoading(): void {
    this.jsonUpload.postObj<ProphaneJobObject[]>([], 'mpacloud/v1/prophaneJobList').subscribe(d => {
      this.jobs = sortBy(d, 'creationdate').reverse();
    });
  }

  update() {
    this.isUpdating = true;
    this.triggerJobListLoading();
    this.isUpdating = false;
  }

  intervalId = setInterval(() => this.update(), 60000);

  confirmDelete(jobno: number, joblabel: string) {
    if (confirm('Are you sure to delete job #' + jobno + ' (' + joblabel + ')' )) {
      const jobToDelete: ProphaneJobObject = this.jobs.filter(i => i.prophaneJobUUID === joblabel)[0];
      this.jsonUpload.postObj<ProphaneJobObject>(jobToDelete, 'mpacloud/v1/prophaneDeleteJob').subscribe(res => {
        console.log('job deleted');
      });
    }
    this.triggerJobListLoading();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}


