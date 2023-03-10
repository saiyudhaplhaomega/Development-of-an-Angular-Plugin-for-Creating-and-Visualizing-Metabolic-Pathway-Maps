import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-overview-results',
  templateUrl: './overview-results.component.html',
  styleUrls: ['./overview-results.component.scss'],
})
export class OverviewResultsComponent implements OnInit {
  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {}

  get overviewImages() {
    const images = [];
    if (this.workflow.ofsData.responseData.overviewResponse !== undefined) {
      images.push('http://localhost:8080/' + this.workflow.ofsData.job.jobId + '/' + this.workflow.ofsData.responseData.overviewResponse.classDistribution);
      images.push('http://localhost:8080/' + this.workflow.ofsData.job.jobId + '/' + this.workflow.ofsData.responseData.overviewResponse.dataSparsity);
    }
    return images;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
