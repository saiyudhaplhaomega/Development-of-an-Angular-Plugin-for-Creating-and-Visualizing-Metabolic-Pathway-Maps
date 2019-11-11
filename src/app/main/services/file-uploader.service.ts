import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';

@Injectable()
export class FileUploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  // TODO: add authentification, clean up
  postFile(file: File, api: string) {
    const fd = new FormData();
    // TODO: this seems to be wrong, should go into header
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(this.webserver.getwebserverurl() + api, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
