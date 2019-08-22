import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'null'
  })
};

@Injectable()
export class SerializableObjectUploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  postObj<T>(obj: T, api: string): Observable<T> {
    return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }
}
