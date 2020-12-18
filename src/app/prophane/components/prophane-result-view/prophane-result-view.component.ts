import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobService } from '../../job.service';
import {ProphaneJobObject} from '../../objects/prophanejobjson';

@Component({
  selector: 'app-prophane-result-view',
  templateUrl: './prophane-result-view.component.html',
  styleUrls: ['./prophane-result-view.component.css']
})
export class ProphaneResultViewComponent implements OnInit {
  job: ProphaneJobObject;
  isUpdating = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJob();
    this.isUpdating = false;
  }

  getJob(): void {
    const uuid = this.route.snapshot.paramMap.get('job_uuid');
    this.jobService.getJobs()
      .subscribe(jobs => this.job = jobs.filter(j => j.prophaneJobUUID === uuid)[0]);
  }

}
