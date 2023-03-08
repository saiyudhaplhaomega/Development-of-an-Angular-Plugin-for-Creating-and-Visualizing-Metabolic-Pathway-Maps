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
    const images = this.workflow.ofsData.responseData.wrapperResponse;
    return images ? Object.values(images) : [];
  }

  isLoading() {
    return this.workflow.loading;
  }
}
