import { Component } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements ContentComponent {

  uuid: String;
  name: String;

  constructor() { }
}
