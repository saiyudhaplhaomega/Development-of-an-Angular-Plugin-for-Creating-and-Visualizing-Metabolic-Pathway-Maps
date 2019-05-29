import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../../app.component';
import {WebserveraddressService} from '../../services/webserveraddress.service';
import {ModelJobObject} from './modeljobjson';
import {Observable} from 'rxjs';


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
    /*var resp = this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/csv2modelinit', JSON.stringify(paramters))*/
    return this.http.post(this.webserver.getwebserverurl() + 'mpacloud/v1/csv2model?modeljobid=' + uuid, fd, {responseType: 'text'});
  }

  modelJobinit(paramters: ModelJobObject) {
    // TODO: proper error handling
    /*var resp = this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/csv2modelinit', JSON.stringify(paramters))*/
    return this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/csv2modelinit', JSON.stringify(paramters), {responseType: 'text'});
  }

}
