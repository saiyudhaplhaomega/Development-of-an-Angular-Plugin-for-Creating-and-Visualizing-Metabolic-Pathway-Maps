///<reference path="../../../../node_modules/@angular/common/http/src/headers.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppComponent} from '../../app.component';
import {WebserveraddressService} from '../../services/webserveraddress.service';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'blob',
    'Accept': 'application/json'
  }),
  responseType: 'blob',
  observe: 'response'
};*/

/*const thumbnailFetchUrl = WebserveraddressService.getwebserverurl() + 'mpacloud/v1/downloadtestLALA';*/
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

@Injectable()
export class ModelDownloaderService {

  data;

  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  getTextFile(): Observable<Blob> {
   /* this.data = this.http.post<HttpResponse<Blob>>(WebserveraddressService.getwebserverurl() + 'mpacloud/v1/downloadtest', httpOptions);*/
    /*this.http.post<string>(WebserveraddressService.getwebserverurl() + 'mpacloud/v1/pridecsv', 'body', httpOptions);*/
    /*    return this.http.post<Blob>(WebserveraddressService.getwebserverurl() + 'mpacloud/v1/downloadtest', 'body', httpOptions);*/
    /*return this.http.post<HttpResponse<Blob>>(WebserveraddressService.getwebserverurl() + 'mpacloud/v1/downloadtest', {headers: headers, responseType: 'blob' as 'json' })*/
    return this.http.post<Blob>(this.webserver.getwebserverurl() + 'mpacloud/v1/downloadtest', {headers: headers, responseType: 'blob' as 'json' });
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    /*return this.http.get(filename, {responseType: 'text'});*/

  }

  /* upload(data: File) {
     const fd = new FormData();
     fd.set('Content-Type', 'multipart/form-data');
     fd.append('uploaded_file', data);
     return this.http.post(WebserveraddressService.getwebserverurl() + 'mpacloud/v1/proteinDBLoader', fd);
   }*/

}

