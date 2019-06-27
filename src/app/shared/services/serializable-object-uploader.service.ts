import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class SerializableObjectUploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  postObj(obj: Object, api: String) {
    return this.http.post(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }
}
