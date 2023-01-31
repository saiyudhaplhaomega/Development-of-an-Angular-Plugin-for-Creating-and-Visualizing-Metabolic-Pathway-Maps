import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { WorkflowService } from '../services/workflow.service';
import { OfsJobState } from '../models/ofs-job.model';

@Component({
  selector: 'ofs-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss'],
})
export class DataOverviewComponent implements OnInit {
  @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {
    if (this.workflow.ofsJob.state === OfsJobState.OVERVIEW_RESULTS) {
      this.switchToResults();
    }
  }

  switchToResults() {
    this.tabs.selectedIndex = 1;
  }
}
