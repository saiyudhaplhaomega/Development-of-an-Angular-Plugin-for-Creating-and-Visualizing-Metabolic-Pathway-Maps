import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import {Endpoints} from '../../../core/services/webserveraddress.service';
import {PeptideJSON, PeptideNode, ProteinGroupJSON, ProteinJSON, PsmJSON} from '../../objects/tableobjects';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-proteingroup-detail-view',
  templateUrl: './proteingroup-detail-view.component.html',
  styleUrls: ['./proteingroup-detail-view.component.css']
})
export class ProteingroupDetailViewComponent implements OnInit, OnChanges {

  tabSelectionState = 0;

  constructor(private _uploaderService: HttpClientService,
              private mpaTableDataService: MpaTableDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {

    //   this._uploaderService.postObject<ProteinList, ProteinList>(
    //     {proteingroup_uuid: this.proteinGroupUUID, proteins: []}, Endpoints.FETCH_PROTEINS).subscribe(data => {
    //       this.proteins = data.proteins;
    //     }
    //   );

    //   this._uploaderService.postObject<PGPeptideList, PGPeptideList>(
    //     {proteingroup_uuid: this.proteinGroupUUID, experiment_uuid: this.experimentUUID,
    //        peptides: []}, Endpoints.FETCH_PEPTIDES_PROTEIN_GROUP).subscribe(data => {
    //       console.log(data);
    //       this.peptides = data.peptides;
    //     }
    //   );
  }

  selectProtein(protein: ProteinJSON) {
    // this.selectedProtein = protein;
    // this.peptidesOfSelectedProtein = this.proteinGroupJSON.peptideList.filter(
    //   peptide => protein.peptideNodes.includes(peptide.id)
    // );

    // this._uploaderService.postObject<PeptideNode[], ProtPeptideList>(
    //   {protein_uuid: protein.protein_uuid, experiment_uuid: this.experimentUUID,
    //       peptides: []}, Endpoints.FETCH_PEPTIDES_PROTEIN).subscribe(data => {
    //     console.log(data);
    //     this.selectedPeptides = data.peptides;
    //   }
    // );
  }

  selectPeptide(peptide: PeptideJSON) {
    // this.selectedPeptide = peptide;
    // this.psmsOfSelectedPeptide = this.proteinGroupJSON.psmList.filter(
    //   psm => psm.peptideID === peptide.id);
  }

}
