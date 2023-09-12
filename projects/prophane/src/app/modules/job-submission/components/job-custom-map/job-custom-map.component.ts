import { Component, OnInit} from '@angular/core';
import { defaultCustomMapTask} from '../../../../model/prophaneFormData';
import {ProphaneJobStateService} from '../../../../services/prophane-job-state.service';
import { ProphaneAnnotationTaskObject } from 'projects/prophane/src/app/model/prophaneannotationtaskjson';


@Component({
  selector: 'app-job-custom-map',
  templateUrl: './job-custom-map.component.html',
  styleUrls: ['./job-custom-map.component.scss']
})
export class JobCustomMapComponent implements OnInit {
  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  ngOnInit(): void {
  }

  onMapChange(custom_task, custom_index, files: FileList) {
    // add to customMap files for upload
    // remove old file if input change
    if (this.prophaneJobState.customMapFiles.length >= custom_index){
      this.prophaneJobState.customMapFiles[custom_index] = files[0]
    }
    else if (this.prophaneJobState.customMapFiles.length < custom_index){
      this.prophaneJobState.customMapFiles.push(files[0])
    }

    // add filename to params path, defaultValue
    custom_task.optionstring[0].defaultValue = files[0].name;
  }

  addCustomMapTask() {
    this.prophaneJobState.customtasksCounter++;
    this.prophaneJobState.taskCounter++;
    const task = JSON.parse(JSON.stringify(defaultCustomMapTask)); // Important: copy object instead of linking!
    task['tasklabel'] = 'Custom Map Annotation Task ' + this.prophaneJobState.customtasksCounter;
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.push(task);
  }

  removeCustomTask(removeTask: ProphaneAnnotationTaskObject, taskIndex: number) {
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks =
      this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.filter(obj => obj !== removeTask);
    this.prophaneJobState.customMapFiles.splice(taskIndex,1)
    this.prophaneJobState.taskCounter--;
    this.prophaneJobState.customtasksCounter--;
    // delete all errors associated with an annotation task
    for (const key of this.prophaneJobState.formErrors.keys()) {
      if (key.startsWith(`${removeTask.scope}_task_${taskIndex}`)) {
        this.prophaneJobState.formErrors.delete(key);
      }
    }
  }
}
