import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'ofs-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss'],
})
export class DataOverviewComponent implements AfterViewInit {
  @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  ngAfterViewInit() {
    if (
      this.workflow.ofsData.responseData.overviewResponse?.classDistribution !==
      undefined
    ) {
      this.switchToResults();
    }
  }

  switchToResults() {
    this.tabs.selectedIndex = 1;
  }
}
