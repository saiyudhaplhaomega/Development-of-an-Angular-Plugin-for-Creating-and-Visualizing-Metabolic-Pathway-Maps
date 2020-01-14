import { Component, OnInit, Input } from '@angular/core';
import { PeptideData, ProteinData, ProteinList } from '../mpa-table/mpa-table.component';
import { AuthenticatedSerializableObjectUploaderService } from 'src/app/core/services/authenticated-serializable-object-uploader.service';

@Component({
  selector: 'app-proteingroup-detail-view',
  templateUrl: './proteingroup-detail-view.component.html',
  styleUrls: ['./proteingroup-detail-view.component.css']
})
export class ProteingroupDetailViewComponent implements OnInit {

  @Input() proteinGroupUUID: string;
  tabSelectionState = 0;

  peptides: PeptideData[];
  proteins: ProteinData[];

  constructor(private _uploaderService: AuthenticatedSerializableObjectUploaderService) { }

  ngOnInit() {
    this._uploaderService.postObj<ProteinList>(
      {proteingroup_uuid: this.proteinGroupUUID, proteins: []}, 'mpacloud/v1/fetchProteins').subscribe(data => {
        this.proteins = data.proteins;
      });
  }

}
