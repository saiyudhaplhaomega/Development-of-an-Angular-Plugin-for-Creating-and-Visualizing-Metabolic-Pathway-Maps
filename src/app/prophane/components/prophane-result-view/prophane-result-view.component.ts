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
  url: string;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJob();
    this.isUpdating = false;
    this.url = window.location.href;
  }

  getJob(): void {
    const uuid = this.route.snapshot.paramMap.get('job_uuid');
    console.log('jobUuid: ' + uuid);
    this.jobService.getJob(uuid).subscribe(res => {
      this.job = res;
      console.log(this.job);
    });
  }

  copyToClipboard() {
    /* Get the text field */
    const textField = document.getElementById('currentUrl') as HTMLInputElement;

    /* Select the text field */
    textField.focus();
    textField.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');
  }

  getKronaUrl(taskId: number) {
    const url = 'https://marbl.github.io/Krona/examples/xml.krona.html';
    console.log('using mock krona url from ' + url);
    return url;
  }


}
