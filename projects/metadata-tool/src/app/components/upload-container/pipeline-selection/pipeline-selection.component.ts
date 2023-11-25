import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pipeline-selection',
  templateUrl: './pipeline-selection.component.html',
  // styleUrls: ...
})
export class PipelineSelectionComponent {
  @Input() pipelines: Pipeline[];
  @Input() selectedPipeline: Pipeline;
  @Output() selectedPipelineChange = new EventEmitter<Pipeline>();

  onPipelineChange() {
    this.selectedPipelineChange.emit(this.selectedPipeline);
  }
}
