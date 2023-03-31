import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { OverviewResponse } from '../../../models/overview-response.model';
import { OFSData } from '../../models/ofs-data.model';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-overview-results',
  templateUrl: './overview-results.component.html',
  styleUrls: ['./overview-results.component.scss'],
})
export class OverviewResultsComponent {
  overViewImages$: Observable<string[]>;

  constructor(private workflow: WorkflowService) {
    // retrieves image urls as observable, used with async pipe in template
    this.overViewImages$ = this.workflow.ofsData$.pipe(
      map((data: OFSData): string[] =>
        this.getImageLinks(data.responseData.overviewResponse)
      )
    );
  }

  getImageLinks(data: OverviewResponse): string[] {
    if (!this.checkForOvervieImages(data)) {
      return [];
    }
    return this.workflow.getResourceUrls([
      data.classDistribution,
      data.dataSparsity,
    ]);
  }

  checkForOvervieImages(ofsData: OverviewResponse): boolean {
    return (
      ofsData?.classDistribution !== undefined &&
      ofsData?.dataSparsity !== undefined
    );
  }

  isLoading() {
    return this.workflow.loading;
  }
}
