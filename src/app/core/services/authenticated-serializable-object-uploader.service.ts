import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedSerializableObjectUploaderService {

  constructor(
    private http: HttpClient, private webserver: WebserveraddressService, private authGuard: AuthGuard) {
  }

  postObj<T>(obj: T, api: string): Observable<T> {
    console.log('IDPROVIDER: ' + this.authGuard.getIdProvider());
    const authorization: string = this.authGuard.getUserAuthorization().toString();
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authorization,
    });
    return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }

  postObjDifferentReturnValue<T>(obj: T, api: string): Observable<any> {
    console.log('IDPROVIDER: ' + this.authGuard.getIdProvider());
    const authorization: string = this.authGuard.getUserAuthorization().toString();
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': authorization,
    });
    return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }

  getObj<T>(api: string): Observable<T> {
    return this.http.get<T>(this.webserver.getwebserverurl() + api);
  }

}
