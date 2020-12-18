import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {JobService} from '../../job.service';

@Component({
  selector: 'app-prophane-job-control',
  templateUrl: './prophane-job-control.component.html',
  styleUrls: ['./prophane-job-control.component.css']
})

export class ProphaneJobControlComponent implements OnInit {

  jobs: ProphaneJobObject[];
  isUpdating = false;

  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs.sort((a, b) => a.creationdate < b.creationdate ? 1 : 0);
    });
  }

  update() {
    this.isUpdating = true;
    this.getJobs();
    this.isUpdating = false;
  }

  intervalId = setInterval(() => this.update(), 60000);

  confirmDelete(jobno: number, jobUuid: string) {
    if (confirm('Are you sure to delete job #' + jobno + ' (' + jobUuid + ')' )) {
      this.deleteJob(jobUuid);
    }
  }

  private deleteJob(jobUuid: string) {
    const jobToDelete: ProphaneJobObject = this.jobs.filter(j => j.prophaneJobUUID === jobUuid)[0];
    this.jobs = this.jobs.filter(j => j !== jobToDelete);
    this.jobService.deleteJob(jobToDelete);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}


