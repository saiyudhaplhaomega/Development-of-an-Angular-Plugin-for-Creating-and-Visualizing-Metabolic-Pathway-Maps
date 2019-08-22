import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';
import { Observable } from 'rxjs';
import { InternalAuthService } from 'src/app/core/services/internal-auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedSerializableObjectUploaderServiceService {

  constructor(
    private http: HttpClient, private webserver: WebserveraddressService, private authService: InternalAuthService) {
  }

  postObj<T>(obj: T, api: string): Observable<T> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getSessionID()
    });
    return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }
}
