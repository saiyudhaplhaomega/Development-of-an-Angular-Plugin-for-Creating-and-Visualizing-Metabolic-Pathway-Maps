import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {WebserveraddressService} from '../../../shared/services/webserveraddress.service';

@Injectable()
export class WebserverloginService {

  constructor(private http: HttpClient, private webserver: WebserveraddressService) {
  }

  login(paramters: string): Observable<string> {
    return this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/login', JSON.stringify(paramters), {responseType: 'text'});
  }

}

