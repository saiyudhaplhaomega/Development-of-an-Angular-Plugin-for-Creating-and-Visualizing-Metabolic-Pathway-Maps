import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DbsearchcontentService} from './dbsearchcontent.service';
import {StreamJSON} from './streamjson';
import {ExperimentJSON} from './experimentjson';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-dbsearchcontent',
  templateUrl: './dbsearchcontent.component.html',
  styleUrls: ['./dbsearchcontent.component.css']
})

export class DBSearchContentComponent {
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
