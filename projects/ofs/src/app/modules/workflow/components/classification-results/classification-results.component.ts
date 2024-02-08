import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WorkflowService } from '../../services/workflow.service';
import { OFSData } from '../../models/ofs-data.model';
import { ClassifierResponse } from '../../models/classifier-response.model';

@Component({
  selector: 'ofs-classification-results',
  templateUrl: './classification-results.component.html',
  styleUrls: ['./classification-results.component.scss'],
})
export class ClassificationResultsComponent {
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
    return this.workflow.getResourceUrls([
      data.pcaImage,
      data.scatterPlotImage,
      data.hacImage,
    ]);
  }

  checkForOvervieImages(ofsData: ClassifierResponse): boolean {
    return ofsData?.pcaImage !== undefined;
  }

  isLoading() {
    return this.workflow.loading;
  }
}
