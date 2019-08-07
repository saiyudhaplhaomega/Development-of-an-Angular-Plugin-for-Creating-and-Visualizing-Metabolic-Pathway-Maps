import { Component } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements ContentComponent {

  uuid: string;
  name: string;

  constructor() { }

}
