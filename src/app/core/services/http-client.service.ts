import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {WebserveraddressService} from './webserveraddress.service';
import {Observable} from 'rxjs';
import {AuthGuard} from 'src/app/core/services/auth-guard.service';


@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(
    private http: HttpClient,
    private webserver: WebserveraddressService,
    private authGuard: AuthGuard) {
  }

  // postJsonObject<T>(obj: T, api: string): Observable<T> {
  //   httpOptions.headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authGuard.getUserAuthorization().toString(),
  //   });
  //   return this.http.post<T>(this.webserver.getEndpoint(api), obj, httpOptions);
  // }

  postObject<T1, T2>(obj: T1, api: string, params?: HttpParams): Observable<T2> {
    return this.http.post<T2>(this.webserver.getEndpoint(api), obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authGuard.getUserAuthorization().toString()
      }),
      params: params
    });
  }

  getObject<T>(api: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.webserver.getEndpoint(api), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authGuard.getUserAuthorization().toString()
      }),
      params: params
    });
  }

  postFile(file: File, api: string, params?: HttpParams) {
    const fd = new FormData();
    // fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(this.webserver.getEndpoint(api), fd, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Authorization': this.authGuard.getUserAuthorization().toString(),
      }),
      observe: 'events',
      params: params,
      reportProgress: true
    });
  }

}
