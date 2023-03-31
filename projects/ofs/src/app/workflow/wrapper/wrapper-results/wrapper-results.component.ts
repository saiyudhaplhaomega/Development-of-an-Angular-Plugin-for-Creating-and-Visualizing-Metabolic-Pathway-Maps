import { Component, OnInit } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Observable, map } from 'rxjs';
import { OFSData } from '../../models/ofs-data.model';
import { WrapperResponse } from '../../../models/wrapper-response.model';

@Component({
  selector: 'ofs-wrapper-results',
  templateUrl: './wrapper-results.component.html',
  styleUrls: ['./wrapper-results.component.scss'],
})
export class WrapperResultsComponent {
  wrapperImages$: Observable<string[]>;

  constructor(private workflow: WorkflowService) {
    // retrieves image urls as observable, used with async pipe in template
    this.wrapperImages$ = this.workflow.ofsData$.pipe(
      map((data: OFSData): string[] =>
        this.getImageLinks(data.responseData.wrapperResponse)
      )
      // output: observable of image urls
    );
  }

  getImageLinks(data: WrapperResponse): string[] {
    if (!this.checkForOvervieImages(data)) {
      return [];
    }
    return this.workflow.getResourceUrls([
      data.wrapperPanel,
      data.wrapperSingleMolecule,
    ]);
  }

  checkForOvervieImages(ofsData: WrapperResponse): boolean {
    return (
      ofsData?.wrapperPanel !== undefined &&
      ofsData?.wrapperSingleMolecule !== undefined
    );
  }

  isLoading() {
    return this.workflow.loading;
  }
}
