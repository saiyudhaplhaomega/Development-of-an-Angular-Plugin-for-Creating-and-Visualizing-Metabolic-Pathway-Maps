import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'ofs-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {}

  get classifierImages() {
    const images = [];
    const classifierResponse =
    this.workflow.ofsData.responseData.classifierResponse;
    if (
      classifierResponse?.pcaImage !== undefined    ) {
      images.push(
        'http://localhost:8080/' +
          this.workflow.ofsData.job.jobId +
          '/' +
        classifierResponse.pcaImage
      );
    return images
  }
}

  isLoading() {
    return this.workflow.loading;
  }
}
