import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';

@Injectable()
export class FileUploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  postFile(file: File, api: string) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(this.webserver.getwebserverurl() + api, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
