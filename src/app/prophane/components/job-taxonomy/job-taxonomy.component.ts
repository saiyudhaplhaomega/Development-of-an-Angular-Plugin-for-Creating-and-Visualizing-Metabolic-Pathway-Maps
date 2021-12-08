import { Component } from '@angular/core';
import {ProphaneJobStateService} from '../../services/prophane-job-state-service/prophane-job-state.service';
import {
  defaultAnnotationTasks,
} from '../../objects/prophaneFormData';

@Component({
  selector: 'app-job-taxonomy',
  templateUrl: './job-taxonomy.component.html',
  styleUrls: ['./job-taxonomy.component.css']
})
export class JobTaxonomyComponent {

  constructor(
    public prophaneJobState: ProphaneJobStateService
  ) { }

  addTaxTask() {
    this.prophaneJobState.taxtasks++;
    this.prophaneJobState.taskCounter++;
    const task = JSON.parse(
      JSON.stringify(defaultAnnotationTasks.filter(
        i => i['scope'] === 'Taxonomy')[0])); // Important: copy object instead of linking!
    task['tasklabel'] = 'Taxonomic Annotation Task ' + this.prophaneJobState.taxtasks;
    this.prophaneJobState.currentProphaneJob.parameters.annotationTasks.push(task);
  }
}
