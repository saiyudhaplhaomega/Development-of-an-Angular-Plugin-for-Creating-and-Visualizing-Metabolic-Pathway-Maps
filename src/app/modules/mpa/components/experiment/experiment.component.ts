import { Component } from '@angular/core';
import { ContentComponent } from '../../interfaces/content.component';
import { DynamicDatabaseService } from '../../services/dynamic-database.service';
import { Search } from '../../classes/search';
import { File } from '../../classes/file';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements ContentComponent {

  uuid: string;
  name: string;

  constructor(private database: DynamicDatabaseService) { }

  addSearch() {
    const searchChild = new Search(this.database.getUnclaimedId().toString());
    this.database.addChild(+this.uuid, searchChild);
  }

  addFile() {
    const fileChild = new File(this.database.getUnclaimedId().toString());
    this.database.addChild(+this.uuid, fileChild);
  }

}
