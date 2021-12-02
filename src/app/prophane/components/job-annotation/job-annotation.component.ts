import {Component, Input} from '@angular/core';
import {ProphaneJobStateService} from '../../services/prophane-job-state-service/prophane-job-state.service';
import {
  defaultAnnotationTasks,
  databaseOptions,
  evalueOptions
} from '../../objects/prophaneFormData';
import {ProphaneAnnotationTaskObject} from '../../objects/prophaneannotationtaskjson';

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

  removeAnnotationTask(removeTask: ProphaneAnnotationTaskObject, taskIndex: number) {
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks =
      this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.filter(obj => obj !== removeTask);
    this.prophaneJobState.taskCounter--;

    // delete all errors associated with an annotation task
    for (const key of this.prophaneJobState.formErrors.keys()) {
      if (key.startsWith(`${removeTask.scope}_task_${taskIndex}`)) {
        this.prophaneJobState.formErrors.delete(key);
      }
    }
  }

}
