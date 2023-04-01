import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Observable, map } from 'rxjs';
import { OFSData } from '../../models/ofs-data.model';
import { PreprocessingResponse } from '../../../models/preprocessing-response.model';

@Component({
  selector: 'ofs-preprocessing-results',
  templateUrl: './preprocessing-results.component.html',
  styleUrls: ['./preprocessing-results.component.scss'],
})
export class PreprocessingResultsComponent {
  preprocessingImages$: Observable<string[]>;

  constructor(private workflow: WorkflowService) {
    // retrieves image urls as observable, used with async pipe in template
    this.preprocessingImages$ = this.workflow.ofsData$.pipe(
      map((data: OFSData): string[] =>
        this.getImageLinks(data.responseData.preprocessingResponse)
      )
      // output: observable of image urls
    );
  }

  getImageLinks(data: PreprocessingResponse): string[] {
    if (!this.checkForOvervieImages(data)) {
      return [];
    }
    return this.workflow.getResourceUrls([data.predictivePerformance]);
  }

  checkForOvervieImages(ofsData: PreprocessingResponse): boolean {
    return ofsData?.predictivePerformance !== undefined;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
