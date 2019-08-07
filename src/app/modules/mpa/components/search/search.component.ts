import { Component } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements ContentComponent {

  uuid: string;
  name: string;

  constructor() { }

}
