import { Component } from '@angular/core';
import {ProphaneJobStateService} from '../../services/prophane-job-state-service/prophane-job-state.service';
import {
  defaultAnnotationTasks,
} from '../../objects/prophaneFormData';

@Component({
  selector: 'app-job-function',
  templateUrl: './job-function.component.html',
  styleUrls: ['./job-function.component.css']
})
export class JobFunctionComponent {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  addFuncTask() {
    this.prophaneJobState.functasks++;
    this.prophaneJobState.taskCounter++;
    const task = JSON.parse(JSON.stringify(defaultAnnotationTasks.filter(
      i => i['scope'] === 'Function')[0])); // Important: copy object instead of linking!
    task['tasklabel'] = 'Functional Annotation Task ' + this.prophaneJobState.functasks;
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.push(task);
  }
}
