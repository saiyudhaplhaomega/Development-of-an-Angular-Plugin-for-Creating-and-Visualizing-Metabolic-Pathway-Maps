import { Component, OnInit } from '@angular/core';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {ProphaneJobObject} from '../../objects/prophanejobjson';

/*interface JobDummy {
  label: string;
  creation: string;
  status: string;
  resultlink: string;
}*/

/*const JOBS: JobDummy[] = [
  {
    label: 'Mein erster Job',
    creation: "18.11.2019 13:45 MEZ",
    status: 'completed',
    resultlink: '#'
  },
  {
    label: 'Mein zweiter Job',
    creation: "18.11.2019 14:45 MEZ",
    status: 'running',
    resultlink: ''
  },
  {
    label: 'Mein dritter Job',
    creation: "18.11.2019 15:45 MEZ",
    status: 'running',
    resultlink: ''
  },
  {
    label: 'Mein vierter Job',
    creation: "18.11.2019 16:45 MEZ",
    status: 'in queue',
    resultlink: ''
  }
];*/


@Component({
  selector: 'app-prophane-job-control',
  templateUrl: './prophane-job-control.component.html',
  styleUrls: ['./prophane-job-control.component.css']
})

export class ProphaneJobControlComponent implements OnInit {

  jobs: ProphaneJobObject[];

  constructor(private jsonUpload: AuthenticatedSerializableObjectUploaderService) {

  }

  ngOnInit(): void {
    this.triggerJobListLoading();
  }
  triggerJobListLoading(): void {
    this.jsonUpload.postObj<ProphaneJobObject[]>([], 'mpacloud/v1/prophaneJobList').subscribe(d => {
      this.jobs = d;
    });
  }

  confirmDelete(jobno: number, joblabel: string) {
    if (confirm('Are you sure to delete job #' + jobno + ' (' + joblabel + ')' )) {
      const jobToDelete: ProphaneJobObject = this.jobs.filter(i => i.prophaneJobUUID === joblabel)[0];
      console.log(jobToDelete)
      this.jsonUpload.postObj<ProphaneJobObject>(jobToDelete, 'mpacloud/v1/prophaneDeleteJob').subscribe(res => {
        console.log('job deleted');
      });
    }
    this.triggerJobListLoading();
  }

}


