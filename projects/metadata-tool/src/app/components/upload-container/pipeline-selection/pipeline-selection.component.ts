import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pipeline-selection',
  templateUrl: './pipeline-selection.component.html',
  styleUrls: ['../metadata-uploadpage.component.scss'],
})
export class SelectionComponent {
  @Input() entries: Pipeline[];
  @Input() label: string;
  @Input() selectedPipeline: Pipeline;
  @Output() selectedPipelineChange = new EventEmitter<Pipeline>();

  onValueChange() {
    this.selectedPipelineChange.emit(this.selectedPipeline);
  }
}
