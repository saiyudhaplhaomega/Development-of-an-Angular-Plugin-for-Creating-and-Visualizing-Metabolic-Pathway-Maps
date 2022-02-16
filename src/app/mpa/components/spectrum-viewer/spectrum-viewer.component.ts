import { Component, OnInit } from '@angular/core';
import {MpaTableDataService} from '../../services/mpa-table-data.service';

@Component({
  selector: 'app-spectrum-viewer',
  templateUrl: './spectrum-viewer.component.html',
  styleUrls: ['./spectrum-viewer.component.css']
})
export class SpectrumViewerComponent implements OnInit {

  spectrumData: string;

  constructor(private mpaTableDataService: MpaTableDataService) {
  }

  ngOnInit() {
    this.mpaTableDataService.spectrumData.subscribe(spectrumData => {
      this.spectrumData = spectrumData;
    });
  }

}
