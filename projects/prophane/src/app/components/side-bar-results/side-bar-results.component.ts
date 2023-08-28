import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { ProphaneJobObject } from '../../model/prophanejobjson';

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
  styleUrls: ['./side-bar-results.component.scss']
})

export class SideBarResultsComponent implements OnInit {
  job: ProphaneJobObject;
  url: string;
  tasks: Task[] = [];
  params: any[] = [];
  lastClickedIndex = 0;
  uuid: string;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('job_uuid');
    this.url = window.location.href;
    this.getJobTasks();
  }

  getJobTasks(): void {
    this.jobService.getJob(this.uuid).subscribe(res => {
      this.job = res;
      let i = 0;
      for (const task of res.parameters.annotationTasks) {
        const task_name = [task.scope, 'Annotation: \n', task.algorithm, task.database].join(' ');
        const new_task: Task = {taskid: i, name: task_name, algorithm: task.algorithm, database: task.database, scope: task.scope};
        this.tasks.push(new_task);
        i = i + 1;
        this.getParams(task.optionstring);
      }});
  }

  getParams(param_array_per_task): void {
    const params_per_task = [];
    for (const param_obj of param_array_per_task) {
      params_per_task.push([param_obj.param, ': ', param_obj.defaultValue].join(''));
    }
    this.params.push(params_per_task);
  }

  changeActive(i) {
    this.lastClickedIndex = i;
  }

  getKronaPlot(index) {
    return 'https://prophane.de:9091/mpacloud/v1/getKrona/' + this.uuid + '/' + 'task' + String(index);
  }
}
