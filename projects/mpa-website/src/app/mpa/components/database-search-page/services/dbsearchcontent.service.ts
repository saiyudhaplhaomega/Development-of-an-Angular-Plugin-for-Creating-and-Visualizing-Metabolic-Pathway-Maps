import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StreamJSON} from '../../../objects/streamjson';
import {ExperimentJSON} from '../../../objects/experimentjson';
import {Endpoints, WebserveraddressService} from '../../../../core/services/webserveraddress.service';
import { AuthGuard } from 'dist/shared-lib';

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
      'Authorization': this.authService.getUserAuthorization()
    });
    return this.http.post<string>(this.webserver.getEndpoint(Endpoints.UNIMPLEMENTED), value, httpOptions);
  }

  newStream(value: string): Observable<string> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getUserAuthorization()
    });
    return this.http.post<string>(this.webserver.getEndpoint(Endpoints.UNIMPLEMENTED), value, httpOptions);
  }

  getExperiments(): Observable<ExperimentJSON[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getUserAuthorization()
    });
    return this.http.post<ExperimentJSON[]>(this.webserver.getEndpoint(Endpoints.UNIMPLEMENTED), 'body', httpOptions);
  }

  getStreams(): Observable<StreamJSON[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authService.getUserAuthorization()
    });
    return this.http.post<StreamJSON[]>(this.webserver.getEndpoint(Endpoints.UNIMPLEMENTED), 'body', httpOptions);
  }

}
