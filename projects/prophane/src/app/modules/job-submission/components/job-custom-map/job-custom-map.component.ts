import { Component, OnInit } from '@angular/core';
import { defaultCustomMapTask} from '../../../../model/prophaneFormData';
import {ProphaneJobStateService} from '../../../../services/prophane-job-state.service';

@Component({
  selector: 'app-job-custom-map',
  templateUrl: './job-custom-map.component.html',
  styleUrls: ['./job-custom-map.component.css']
})
export class JobCustomMapComponent implements OnInit {
  readonly algoOption = [{name: 'acc2annot_mapper', value: 'acc2annot_mapper'}]
  readonly typeOptions = ['taxonomic', 'functional']

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) {
  }

  ngOnInit(): void {
  }

  onMapChange(files: FileList, taskid: number) {
    this.prophaneJobState.currentProphaneJob.parameters
    .customMapTasks[taskid].optionstring[0].defaultValue = files[0];
  }


  addCustomMapTask() {
    this.prophaneJobState.customtasksCounter++;
    let task = JSON.parse(
      JSON.stringify(defaultCustomMapTask)); // Important: copy object instead of linking!
    task['tasklabel'] = 'Custom Map Annotation Task ' + this.prophaneJobState.customtasksCounter;
    this.prophaneJobState.currentProphaneJob.parameters.customMapTasks.push(task);
  }

  removeCustomTask(remove_custom_task, customTaskIndex) {
    this.prophaneJobState.currentProphaneJob.parameters.customMapTasks =
      this.prophaneJobState.currentProphaneJob.parameters.customMapTasks.filter(
        obj => obj !== remove_custom_task
        );
    this.prophaneJobState.customtasksCounter--;
    // delete all errors associated with an annotation task
    for (const key of this.prophaneJobState.formErrors.keys()) {
      if (key.startsWith(`${remove_custom_task.scope}_task_${customTaskIndex}`)) {
        this.prophaneJobState.formErrors.delete(key);
      }
    }
  }

}
