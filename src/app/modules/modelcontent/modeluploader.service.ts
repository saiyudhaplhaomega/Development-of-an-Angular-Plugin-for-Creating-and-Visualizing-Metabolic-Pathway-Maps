import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppComponent} from '../../app.component';
import {WebserveraddressService} from '../../services/webserveraddress.service';
import {ModelJobObject} from './modeljobjson';


@Injectable()
export class ModeluploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  upload(data: File, paramters: ModelJobObject) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', data);
    // TODO: proper error handling
    const uuid = this.http.post(this.webserver.getwebserverurl() + '/mpacloud/v1/csv2modelinit', JSON.stringify(paramters) );
    return this.http.post(this.webserver.getwebserverurl() + 'mpacloud/v1/csv2model/' + uuid, fd);
  }

}
