import { Component, OnInit, Input } from '@angular/core';
import { PeptideData, ProteinData, ProteinList, PGPeptideList, ProtPeptideList } from '../../objects/tableobjects';
import { AuthenticatedSerializableObjectUploaderService } from 'src/app/core/services/authenticated-serializable-object-uploader.service';

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

  constructor(private _uploaderService: AuthenticatedSerializableObjectUploaderService) {
    this.peptides = [];
    this.proteins = [];
    this.selectedPeptides = [];
  }

  selectProtein(protein: ProteinData) {
    this.selectedProtein = protein;
    this._uploaderService.postObj<ProtPeptideList>(
      {protein_uuid: protein.protein_uuid, experiment_uuid: this.experimentUUID,
          peptides: []}, 'mpacloud/v1/fetchPeptidesProtein').subscribe(data => {
        console.log(data);
        this.selectedPeptides = data.peptides;
      }
    );
  }

  ngOnInit() {
    this._uploaderService.postObj<ProteinList>(
      {proteingroup_uuid: this.proteinGroupUUID, proteins: []}, 'mpacloud/v1/fetchProteins').subscribe(data => {
        this.proteins = data.proteins;
      }
    );
    this._uploaderService.postObj<PGPeptideList>(
      {proteingroup_uuid: this.proteinGroupUUID, experiment_uuid: this.experimentUUID,
         peptides: []}, 'mpacloud/v1/fetchPeptidesProteinGroup').subscribe(data => {
        console.log(data);
        this.peptides = data.peptides;
      }
    );
  }

}
