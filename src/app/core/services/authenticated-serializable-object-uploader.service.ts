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
    private http: HttpClient, private webserver: WebserveraddressService, private authService: AuthGuard) {
  }

  postObj<T>(obj: T, api: string): Observable<T> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getIDToken()
    });
    return this.http.post<T>(this.webserver.getwebserverurl() + api, obj, httpOptions);
  }
}
