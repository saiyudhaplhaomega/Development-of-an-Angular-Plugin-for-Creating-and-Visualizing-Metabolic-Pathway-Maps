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
    const images = this.workflow.overviewImages;
    return images ? Object.values(images) : [];
  }

  isLoading() {
    return this.workflow.loading;
  }
}
