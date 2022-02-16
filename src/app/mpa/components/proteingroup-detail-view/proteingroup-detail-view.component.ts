import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import {PeptideJSON, ProteinJSON} from '../../objects/tableobjects';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

export enum PeptideScope {
  'proteinGroup',
  'singleProtein'
}

export enum PsmScope {
  'proteinGroup',
  'singlePeptide'
}

@Component({
  selector: 'app-proteingroup-detail-view',
  templateUrl: './proteingroup-detail-view.component.html',
  styleUrls: ['./proteingroup-detail-view.component.css']
})
export class ProteingroupDetailViewComponent implements OnInit, OnChanges {

  peptideScopes = {
    proteinGroup: PeptideScope.proteinGroup,
    singleProtein: PeptideScope.singleProtein
  };

  psmScopes = {
    proteinGroup: PsmScope.proteinGroup,
    singlePeptide: PsmScope.singlePeptide
  };

  tabSelectionState = 0;

  constructor(private _uploaderService: HttpClientService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
  }

}
