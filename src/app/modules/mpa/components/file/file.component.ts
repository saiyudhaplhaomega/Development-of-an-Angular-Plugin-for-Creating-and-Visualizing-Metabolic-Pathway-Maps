import { Component, Output, EventEmitter } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements ContentComponent {

  uuid: String;
  name: String;

  @Output() delete: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  deleteThis() {
    this.delete.emit(this.uuid);
  }

}
