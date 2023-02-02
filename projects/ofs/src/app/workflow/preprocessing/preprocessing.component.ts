import { Component, OnInit, ViewChild } from '@angular/core';
import { OfsJobState } from '../models/ofs-job.model';
import { WorkflowService } from '../services/workflow.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'ofs-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.scss'],
})
export class PreprocessingComponent implements OnInit {
  @ViewChild('tabs') tabs: MatTabGroup;

  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {
    if (this.workflow.ofsJob.state === OfsJobState.PREPROCESSING_RESULTS) {
      this.switchToResults();
    }
  }

  switchToResults() {
    this.tabs.selectedIndex = 1;
  }

  hasResults() {
    return this.workflow.preprocessingImages !== undefined;
  }
}
