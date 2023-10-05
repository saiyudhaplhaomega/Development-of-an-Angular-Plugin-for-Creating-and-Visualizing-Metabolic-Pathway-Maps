import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Observable, map } from 'rxjs';
import { OFSData } from '../../models/ofs-data.model';
import { ClassifierResponse } from '../../../models/classifier-response.model';

@Component({
  selector: 'ofs-results-figure',
  templateUrl: './results-figure.component.html',
  styleUrls: ['./results-figure.component.scss'],
})
export class ResultsFigureComponent {
  classifierImages$: Observable<string[]>;

  constructor(private workflow: WorkflowService) {
    // retrieves image urls as observable, used with async pipe in template
    this.classifierImages$ = this.workflow.ofsData$.pipe(
      map((data: OFSData): string[] =>
        this.getImageLinks(data.responseData.classifierResponse)
      )
      // output: observable of image urls
    );
  }

  getImageLinks(data: ClassifierResponse): string[] {
    if (!this.checkForOvervieImages(data)) {
      return [];
    }
    return this.workflow.getResourceUrls([data.pcaImage, data.hacImage, data.scatterPlotImage]);
  }

  checkForOvervieImages(ofsData: ClassifierResponse): boolean {
    return ofsData?.pcaImage !== undefined;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
