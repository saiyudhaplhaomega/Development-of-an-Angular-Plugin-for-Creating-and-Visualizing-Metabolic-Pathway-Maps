import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';
import {UserLogin} from '../../mpa/objects/user-login';
import {AuthGuard} from './auth-guard.service';

@Injectable()
export class FileUploaderService {

  constructor(
    private http: HttpClient, private webserver: WebserveraddressService, private authService: AuthGuard) {
  }

  // TODO: add authentification, clean up
  postFile(file: File, api: string) {
    const fd = new FormData();
    const headers = new HttpHeaders({
      'Authorization': this.authService.getUserAuthorization()
    })
    // TODO: this seems to be wrong, should go into header, or should it?
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(this.webserver.getwebserverurl() + api, fd, {headers,
      reportProgress: true,
      observe: 'events'
    });
  }

}
