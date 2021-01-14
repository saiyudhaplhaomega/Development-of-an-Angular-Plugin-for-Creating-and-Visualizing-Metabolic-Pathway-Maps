import { Component, OnInit } from '@angular/core';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import { JobService } from '../../job.service';
import { ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';

export interface Task {
  taskid: number;
  name: string;
  database: string;
  algorithm: string;
  scope: string;
}

@Component({
  selector: 'app-side-bar-results',
  templateUrl: './side-bar-results.component.html',
  styleUrls: ['./side-bar-results.component.css']
})

export class SideBarResultsComponent implements OnInit {
  job: ProphaneJobObject;
  url: string;
  tasks: Task[] = [];
  lastClickedIndex = 0;
  uuid: string;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('job_uuid');
    this.url = window.location.href;
    /*this.tasks = [
      {taskid: 0, name: 'tax task 0'},
      {taskid: 1, name: 'tax task 1'},
      {taskid: 2, name: 'tax task 2'}
    ];*/
    // this.tasks = this.getJobTasks();
    this.getJobTasks();
  }

  getJobTasks(): void {
    this.jobService.getJob(this.uuid).subscribe(res => {
      this.job = res;
      let i = 0;
      for (const task of res.parameters.annotationTasks) {
        // this.new_task.taskid = +task.tasklabel.split(' ')[-1];
        const task_name = [task.scope, 'Annotation: \n', task.algorithm, task.database].join(' ');
        const new_task: Task = {taskid: i, name: task_name, algorithm: task.algorithm, database: task.database, scope: task.scope};
        this.tasks.push(new_task);
        i = i + 1;
    }});
  }

  changeActive(i) {
    this.lastClickedIndex = i;
  }

  getKronaPlot() {
    const url = 'https://prophane.de:9091/mpacloud/v1/getKrona/' + this.uuid + '/' + 'task' + String(this.lastClickedIndex);
    return url;
  }

}
