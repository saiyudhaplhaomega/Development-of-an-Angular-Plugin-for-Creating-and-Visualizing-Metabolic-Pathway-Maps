import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StreamJSON} from '../../../objects/streamjson';
import {ExperimentJSON} from '../../../objects/experimentjson';
import {WebserveraddressService} from '../../../../core/services/webserveraddress.service';
import { AuthGuard } from '../../../../core/services/auth-guard.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class DbsearchcontentService {
  constructor(private http: HttpClient, private webserver: WebserveraddressService, private authService: AuthGuard) { }


  newExperiment(value: string): Observable<string> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getIDToken()
    });
    return this.http.post<string>( this.webserver.getwebserverurl() + 'mpacloud/v1/addexperiment', value, httpOptions);
  }

  newStream(value: string): Observable<string> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getIDToken()
    });
    return this.http.post<string>(this.webserver.getwebserverurl() + 'mpacloud/v1/addstreamingsession', value, httpOptions);
  }

  getExperiments(): Observable<ExperimentJSON[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getIDToken()
    });
    return this.http.post<ExperimentJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/listexperiments', 'body', httpOptions);
  }

  getStreams(): Observable<StreamJSON[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getIDToken()
    });
    return this.http.post<StreamJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/liststreamingsessions', 'body', httpOptions);
  }

}
