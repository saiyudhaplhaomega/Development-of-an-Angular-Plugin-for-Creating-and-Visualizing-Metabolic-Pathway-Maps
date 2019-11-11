import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DbsearchcontentService} from './services/dbsearchcontent.service';
import {StreamJSON} from '../../../main/objects/streamjson';
import {ExperimentJSON} from '../../../main/objects/experimentjson';

@Component({
  selector: 'app-database-search-page',
  templateUrl: './database-search-page.component.html',
  styleUrls: ['./database-search-page.component.css']
})

export class DatabaseSearchPageComponent {
  title = 'app';

  experimentList: ExperimentJSON[];
  streamList: StreamJSON[];

  constructor(private http: HttpClient, private dbsearchservice: DbsearchcontentService) {
  }

  newExperiment(value: string) {
    this.dbsearchservice.newExperiment(value).subscribe(res => {
      console.log(res);
    });
  }

  newStreamingSession(value: string) {
    this.dbsearchservice.newStream(value).subscribe(res => {
        console.log(res);
      });
  }

  getExperiments() {
    this.dbsearchservice.getExperiments().subscribe(res => {
      this.experimentList = res;
    });
  }

  getStreamingSessions() {
    this.dbsearchservice.getStreams().subscribe(res => {
      this.streamList = res;
    });
  }

}
