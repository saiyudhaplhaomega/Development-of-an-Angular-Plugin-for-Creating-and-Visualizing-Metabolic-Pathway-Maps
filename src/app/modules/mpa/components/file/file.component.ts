import { Component, Output, EventEmitter } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';
import { DynamicDatabaseService } from '../../services/dynamic-database.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements ContentComponent {

  uuid: string;
  name: string;

  constructor(private database: DynamicDatabaseService) {
  }

  deleteThis() {
    this.database.delete(+this.uuid);
  }

}
