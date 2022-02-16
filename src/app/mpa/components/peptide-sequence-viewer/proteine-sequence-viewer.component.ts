import { Component, OnInit } from '@angular/core';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-protein-sequence-viewer',
  templateUrl: './proteine-sequence-viewer.component.html',
  styleUrls: ['./proteine-sequence-viewer.component.css']
})
export class ProteineSequenceViewerComponent implements OnInit {

  proteinSequenceData: string;

  constructor(private mpaTableDataService: MpaTableDataService) { }

  ngOnInit() {
    this.mpaTableDataService.proteinSequenceData.subscribe(peptideSequence => {
      this.proteinSequenceData = peptideSequence;
    });
  }

}
