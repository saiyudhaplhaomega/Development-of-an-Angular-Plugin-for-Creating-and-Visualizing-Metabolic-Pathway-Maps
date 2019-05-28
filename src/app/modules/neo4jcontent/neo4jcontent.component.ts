import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Neo4jhttprequestsService} from '../../services/neo4jhttprequests.service';
import {Neo4jJSON} from '../../services/neo4jjson';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebserveraddressService} from '../../services/webserveraddress.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-neo4jcontent',
  templateUrl: './neo4jcontent.component.html',
  styleUrls: ['./neo4jcontent.component.css']
})
export class Neo4jcontentComponent {

  constructor(private http: HttpClient, private webserver: WebserveraddressService) {
  }

  title = 'app';
  expID: string;
  data: Neo4jJSON;

  graphFromExpID(id: string) {
    this.http.post<string>(this.webserver.getwebserverurl() + 'mpacloud/v1/createresultgraph', 'body', httpOptions);
  }
}


