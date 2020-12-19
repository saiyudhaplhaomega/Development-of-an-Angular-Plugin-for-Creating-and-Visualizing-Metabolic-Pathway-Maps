import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

import { JobService } from '../../job.service';
import {ProphaneJobObject} from '../../objects/prophanejobjson';

@Component({
  selector: 'app-prophane-result-view',
  templateUrl: './prophane-result-view.component.html',
  styleUrls: ['./prophane-result-view.component.css']
})
export class ProphaneResultViewComponent implements OnInit {
  job: ProphaneJobObject;
  kronaHtml;
  isUpdating = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getJob();
    this.isUpdating = false;
    this.kronaHtml = this.getKrona(1);
  }

  getJob(): void {
    const uuid = this.route.snapshot.paramMap.get('job_uuid');
    this.jobService.getJobs()
      .subscribe(jobs => this.job = jobs.filter(j => j.prophaneJobUUID === uuid)[0]);
  }

  getKrona(id: number) {
    // const url = 'https://randalierer-cloud.chickenkiller.com/index.php/s/4JHKQHBeBQ2cwt5/download';
    // const url = 'http://marbl.github.io/Krona/examples/xml.krona.html';
    const url = 'https://kissht.com/';
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.kronaHtml = this.sanitizer.bypassSecurityTrustHtml(res);
    });
  }


}
