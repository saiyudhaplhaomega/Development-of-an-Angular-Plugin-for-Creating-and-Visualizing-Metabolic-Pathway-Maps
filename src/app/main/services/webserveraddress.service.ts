import {Injectable} from '@angular/core';

@Injectable()
export class WebserveraddressService {

  // TODO: should go to environment variables ... but thats not so easy --> during deployment as parameter
  webserverurl = 'http://129.70.51.126:9091/';

  constructor() {
  }

  public getwebserverurl(): string {
    return this.webserverurl;
  }

}
