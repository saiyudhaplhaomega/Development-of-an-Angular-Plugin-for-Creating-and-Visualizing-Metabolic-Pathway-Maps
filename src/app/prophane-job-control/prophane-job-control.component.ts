import { Component, OnInit } from '@angular/core';

interface JobDummy {
  label: string;
  creation: string;
  status: string;
  resultlink: string;
}

const JOBS: JobDummy[] = [
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
];

@Component({
  selector: 'app-prophane-job-control',
  templateUrl: './prophane-job-control.component.html',
  styleUrls: ['./prophane-job-control.component.css']
})

export class ProphaneJobControlComponent {

  jobs = JOBS;

  confirmDelete(jobno: number, joblabel: string) {
    if(confirm("Are you sure to delete job #" + jobno + " (" + joblabel + ")" )) {
      console.log("Implement delete functionality here");
    }
  }

}
