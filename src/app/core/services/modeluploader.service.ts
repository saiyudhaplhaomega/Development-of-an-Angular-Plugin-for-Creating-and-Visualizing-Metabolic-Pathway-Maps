import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebserveraddressService } from '../../shared/services/webserveraddress.service';
import { ModelJobObject } from '../models/modeljobjson';

@Injectable()
export class ModeluploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  uuid: string;


  upload(data: File, uuid: string) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', data);
    // TODO: proper error handling
    return this.http.post(this.webserver.getwebserverurl() + 'mpacloud/v1/csv2model?modeljobid=' + uuid, fd, { responseType: 'text' });
  }

  modelJobinit(parameters: ModelJobObject) {
    // TODO: proper error handling
    return this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/csv2modelinit', JSON.stringify(parameters), 
    { responseType: 'text' });
  }

}
