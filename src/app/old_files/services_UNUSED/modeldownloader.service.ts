import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WebserveraddressService} from '../../main/services/webserveraddress.service';

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
    return this.http.post<Blob>(this.webserver.getwebserverurl() + 'mpacloud/v1/downloadtest', {headers: headers, responseType: 'blob' as 'json' });
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    /*return this.http.get(filename, {responseType: 'text'});*/

  }
}

