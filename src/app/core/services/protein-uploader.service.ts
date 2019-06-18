import {Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {WebserveraddressService} from '../../shared/services/webserveraddress.service'

@Injectable()
export class ProteinUploaderService {
  constructor(
    private http: HttpClient, private webserver: WebserveraddressService) {
  }

  upload(data: File) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', data);
    return this.http.post(this.webserver.getwebserverurl() + 'mpacloud/v1/proteinDBLoader', fd);
  }

}
