import { Component } from '@angular/core';
import { PanelOrientation } from 'shared-lib';

@Component({
  selector: 'ofs-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.scss'],
})
export class PreprocessingComponent {
  orientation = PanelOrientation.VERTICAL;

  constructor() {}
}
