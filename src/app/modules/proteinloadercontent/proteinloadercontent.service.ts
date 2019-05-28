import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProtDBJSON} from './protdbjson';
import {AppComponent} from '../../app.component';
import {WebserveraddressService} from '../../services/webserveraddress.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ProtDBContentService {
  constructor(private http: HttpClient, private webserver: WebserveraddressService) { }


  getProtDBs(): Observable<ProtDBJSON[]> {
    return  this.http.post<ProtDBJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/listproteindbs', 'body', httpOptions);
  }

}
