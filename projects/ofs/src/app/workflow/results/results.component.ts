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
    const images = this.workflow.ofsData.responseData.classifierResponse;
    return images ? Object.values(images) : [];
  }

  isLoading() {
    return this.workflow.loading;
  }
}
