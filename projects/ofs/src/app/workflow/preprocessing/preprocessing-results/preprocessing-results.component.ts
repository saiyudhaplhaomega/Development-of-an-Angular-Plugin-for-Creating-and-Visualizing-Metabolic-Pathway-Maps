import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-preprocessing-results',
  templateUrl: './preprocessing-results.component.html',
  styleUrls: ['./preprocessing-results.component.scss'],
})
export class PreprocessingResultsComponent implements OnInit {
  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {}

  get preprocessingImages() {
    const images = this.workflow.preprocessingImages;
    return images ? Object.values(images) : [];
  }

  isLoading() {
    return this.workflow.loading;
  }
}
