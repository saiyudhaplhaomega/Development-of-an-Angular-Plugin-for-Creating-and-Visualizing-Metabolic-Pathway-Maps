import { Component, OnInit } from '@angular/core';
import { ProteinSequenceObject } from '../../model/tableobjects';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-protein-sequence-viewer',
  templateUrl: './proteine-sequence-viewer.component.html',
  styleUrls: ['./proteine-sequence-viewer.component.css']
})
export class ProteineSequenceViewerComponent implements OnInit {

  proteinSequenceData: ProteinSequenceObject;

  constructor(public mpaTableDataService: MpaTableDataService) { }

  ngOnInit() {
    this.mpaTableDataService.proteinSequenceData.subscribe(proteinSequence => {
      this.proteinSequenceData = proteinSequence;
    });
  }

}
