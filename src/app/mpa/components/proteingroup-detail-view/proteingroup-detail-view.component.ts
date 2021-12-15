import { Component, OnInit, Input } from '@angular/core';
import { PeptideData, ProteinData, ProteinList, PGPeptideList, ProtPeptideList } from '../../objects/tableobjects';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import {Endpoints} from '../../../core/services/webserveraddress.service';

@Component({
  selector: 'app-proteingroup-detail-view',
  templateUrl: './proteingroup-detail-view.component.html',
  styleUrls: ['./proteingroup-detail-view.component.css']
})
export class ProteingroupDetailViewComponent implements OnInit {

  @Input() proteinGroupUUID: string;
  @Input() experimentUUID: string;
  tabSelectionState = 0;

  peptideList: PGPeptideList;
  proteinList: ProteinList;

  peptides: PeptideData[];
  proteins: ProteinData[];

  selectedProtein: ProteinData;
  selectedPeptides: PeptideData[];

  constructor(private _uploaderService: HttpClientService) {
    this.peptides = [];
    this.proteins = [];
    this.selectedPeptides = [];
  }

  selectProtein(protein: ProteinData) {
    this.selectedProtein = protein;
    this._uploaderService.postObject<ProtPeptideList>(
      {protein_uuid: protein.protein_uuid, experiment_uuid: this.experimentUUID,
          peptides: []}, Endpoints.FETCH_PEPTIDES_PROTEIN).subscribe(data => {
        console.log(data);
        this.selectedPeptides = data.peptides;
      }
    );
  }

  ngOnInit() {
    this._uploaderService.postObject<ProteinList>(
      {proteingroup_uuid: this.proteinGroupUUID, proteins: []}, Endpoints.FETCH_PROTEINS).subscribe(data => {
        this.proteins = data.proteins;
      }
    );
    this._uploaderService.postObject<PGPeptideList>(
      {proteingroup_uuid: this.proteinGroupUUID, experiment_uuid: this.experimentUUID,
         peptides: []}, Endpoints.FETCH_PEPTIDES_PROTEIN_GROUP).subscribe(data => {
        console.log(data);
        this.peptides = data.peptides;
      }
    );
  }

}
