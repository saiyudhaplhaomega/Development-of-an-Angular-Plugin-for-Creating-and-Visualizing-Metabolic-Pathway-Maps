import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { WorkflowService } from '../services/workflow.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'ofs-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.scss'],
})
export class PreprocessingComponent implements AfterViewInit {
  @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  // Life Cycle Hooks
  ngAfterViewInit(): void {
    if (this.hasResults()) {
      this.switchToResults();
    }
  }

  //  Methods
  switchToResults() {
    // this.tabs.selectedIndex = 1;
  }

  hasResults() {
    return (
      this.workflow.ofsData.responseData.preprocessingResponse
        ?.predictivePerformance !== undefined
    );
  }
}
