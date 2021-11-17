import {Component, Input} from '@angular/core';
import {ProphaneJobStateService} from '../prophane-job-submission-main/prophane-job-state-service/prophane-job-state.service';
import {
  defaultAnnotationTasks,
  databaseOptions,
  evalueOptions
} from '../../objects/prophaneFormData';

@Component({
  selector: 'app-job-annotation',
  templateUrl: './job-annotation.component.html',
  styleUrls: ['./job-annotation.component.css']
})
export class JobAnnotationComponent {

  @Input() scope: string;
  readonly databaseOptions = databaseOptions;

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  removeAnnotationTask(removeTask) {
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks =
      this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.filter(obj => obj !== removeTask);
    this.prophaneJobState.taskCounter--;
  }

}
