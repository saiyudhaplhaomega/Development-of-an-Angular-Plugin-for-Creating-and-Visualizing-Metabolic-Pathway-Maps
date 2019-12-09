import {Injectable} from '@angular/core';

@Injectable()
export class WebserveraddressService {

  // TODO: should go to environment variables ... but thats not so easy --> during deployment as parameters
  webserverurl = 'https://www.prophane.de:9091/';

  constructor() {
  }

  public getwebserverurl(): string {
    return this.webserverurl;
  }

}
