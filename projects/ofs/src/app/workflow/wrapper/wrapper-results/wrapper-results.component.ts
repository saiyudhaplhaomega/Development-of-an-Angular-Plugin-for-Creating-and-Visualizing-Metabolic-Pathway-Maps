import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-wrapper-results',
  templateUrl: './wrapper-results.component.html',
  styleUrls: ['./wrapper-results.component.scss'],
})
export class WrapperResultsComponent implements OnInit {
  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {}

  get wrapperImages() {
    const images = [];
    const wrapperResponse =
    this.workflow.ofsData.responseData.wrapperResponse;
    if (
      wrapperResponse?.wrapperPanel !== undefined &&
      wrapperResponse?.wrapperSingleMolecule !== undefined
    ) {
      images.push(
        'http://localhost:8080/' +
          this.workflow.ofsData.job.jobId +
          '/' +
        wrapperResponse.wrapperPanel
      );
      images.push(
        'http://localhost:8080/' +
          this.workflow.ofsData.job.jobId +
          '/' +
        wrapperResponse.wrapperSingleMolecule
      );
    }
    return images;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
