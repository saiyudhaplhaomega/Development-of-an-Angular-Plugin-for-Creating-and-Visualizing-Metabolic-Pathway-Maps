import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModelJSON} from './modeljson';
import {WebserveraddressService} from '../../../../shared/services/webserveraddress.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ModelContentService {
  constructor(private http: HttpClient, private webserver: WebserveraddressService) { }

  getModels(): Observable<ModelJSON[]> {
    return  this.http.post<ModelJSON[]>(this.webserver.getwebserverurl() + 'mpacloud/v1/listmodels', 'body', httpOptions);
  }

}
