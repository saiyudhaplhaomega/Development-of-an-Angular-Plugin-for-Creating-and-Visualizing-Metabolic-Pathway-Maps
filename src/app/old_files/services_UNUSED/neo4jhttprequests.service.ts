import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Neo4jJSON} from '../../mpa/objects/neo4jjson';
import {WebserveraddressService} from '../../core/services/webserveraddress.service';

@Injectable()
export class Neo4jhttprequestsService {

  constructor(private http: HttpClient, private webserver: WebserveraddressService) {
  }

  getRequestJSON(): Observable<Neo4jJSON> {
    return this.http.get<Neo4jJSON>(this.webserver.getwebserverurl() + 'ajson');
  }

}

