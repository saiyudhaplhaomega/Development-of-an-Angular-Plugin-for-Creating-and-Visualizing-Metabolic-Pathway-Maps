import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StreamJSON} from './streamjson';
import {ExperimentJSON} from './experimentjson';
import {WebserveraddressService} from '../../../../shared/services/webserveraddress.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class DbsearchcontentService {
  constructor(private http: HttpClient, private webserver: WebserveraddressService) { }


  newExperiment(value: string): Observable<string> {
    return this.http.post<string>( this.webserver.getwebserverurl() + 'mpacloud/v1/addexperiment', value, httpOptions);
  }

  newStream(value: string): Observable<string> {
    return this.http.post<string>(this.webserver.getwebserverurl() + 'mpacloud/v1/addstreamingsession', value, httpOptions);
  }

  getExperiments(): Observable<ExperimentJSON[]> {
    return this.http.post<ExperimentJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/listexperiments', 'body', httpOptions);
  }

  getStreams(): Observable<StreamJSON[]> {
    return this.http.post<StreamJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/liststreamingsessions', 'body', httpOptions);
  }

}
