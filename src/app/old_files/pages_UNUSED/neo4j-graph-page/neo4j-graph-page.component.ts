import {Component} from '@angular/core';
import {Neo4jJSON} from '../../../main/objects/neo4jjson';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WebserveraddressService} from '../../../main/services/webserveraddress.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-neo4j-graph-page',
  templateUrl: './neo4j-graph-page.component.html',
  styleUrls: ['./neo4j-graph-page.component.css']
})
export class Neo4jGraphPageComponent {

  constructor(private http: HttpClient, private webserver: WebserveraddressService) {
  }

  title = 'app';
  expID: string;
  data: Neo4jJSON;

  graphFromExpID(id: string) {
    this.http.post<string>(this.webserver.getwebserverurl() + 'mpacloud/v1/createresultgraph', 'body', httpOptions);
  }
}


