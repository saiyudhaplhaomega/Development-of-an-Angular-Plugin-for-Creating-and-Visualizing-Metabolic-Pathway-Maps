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
    const images = [];
    const preprocessingResponse =
    this.workflow.ofsData.responseData.preprocessingResponse;
    if (
      preprocessingResponse?.pvaluesMolecules !== undefined &&
      preprocessingResponse?.predictivePerformance !== undefined
    ) {
      images.push(
        'http://localhost:8080/' +
          this.workflow.ofsData.job.jobId +
          '/' +
          preprocessingResponse.predictivePerformance
      );
      images.push(
        'http://localhost:8080/' +
          this.workflow.ofsData.job.jobId +
          '/' +
          preprocessingResponse.pvaluesMolecules
      );
    }
    return images;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
