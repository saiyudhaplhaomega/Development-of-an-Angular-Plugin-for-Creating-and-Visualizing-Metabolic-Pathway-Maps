import { Component, OnInit } from '@angular/core';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import { JobService } from '../../job.service';
import { ActivatedRoute } from '@angular/router';

export interface Task {
  taskid: number;
  name: string;
}

@Component({
  selector: 'app-side-bar-results',
  templateUrl: './side-bar-results.component.html',
  styleUrls: ['./side-bar-results.component.css']
})

export class SideBarResultsComponent implements OnInit {
  job: ProphaneJobObject;
  isUpdating = true;
  url: string;
  tasks: Task[] = [];
  lastClickedIndex = 0;
  buttonClicked = null;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getJobTasks();
    this.isUpdating = false;
    this.url = window.location.href;
    this.tasks = [
      {taskid: 0, name: 'tax task 0'},
      {taskid: 1, name: 'tax task 1'},
      {taskid: 2, name: 'tax task 2'}
    ];
    // this.tasks = this.getJobTasks()
  }
  // funktioniert noch nicht
  getJobTasks(): void {
    const uuid = this.route.snapshot.paramMap.get('job_uuid');
    console.log('jobUuid: ' + uuid);
    this.jobService.getJob(uuid).subscribe(res => {
      this.job = res;
    });
    // into Task format
  }

  changeActive(i) {
    this.lastClickedIndex = i;
  }

  getKronaPlot() {
    console.log(this.lastClickedIndex);
    const url = 'https://marbl.github.io/Krona/examples/xml.krona.html';
    console.log('using mock krona url');
    return url;
  }

}
