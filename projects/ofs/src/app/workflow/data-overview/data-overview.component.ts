import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { WorkflowService } from '../services/workflow.service';

@Component({
  selector: 'ofs-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss'],
})
export class DataOverviewComponent {
  // @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  // Life Cycle Hooks
  // ngAfterViewInit() {
  //   if (this.hasResults()) {
  //     this.switchToResults();
  //   }
  // }

  // Methods
  // switchToResults() {
  //   this.tabs.selectedIndex = 1;
  // }

  // hasResults() {
  //   return (
  //     this.workflow.ofsData.responseData.overviewResponse?.classDistribution !==
  //     undefined
  //   );
  // }
}
