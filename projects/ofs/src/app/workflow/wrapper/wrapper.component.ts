import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OfsJobState } from '../models/ofs-job.model';
import { WorkflowService } from '../services/workflow.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'ofs-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements AfterViewInit {
  @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  ngAfterViewInit(): void {
    if (this.hasResults()) {
      this.switchToResults();
    }
  }

  switchToResults() {
    // this.tabs.selectedIndex = 1;
  }

  hasResults() {
    return (
      this.workflow.ofsData.responseData.wrapperResponse?.wrapperPanel !==
      undefined
    );
  }
}
