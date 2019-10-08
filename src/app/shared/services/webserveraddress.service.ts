import {Injectable} from '@angular/core';

@Injectable()
export class WebserveraddressService {

  webserverurl = 'http://129.70.51.126:9091/';

  constructor() {
  }

  public getwebserverurl(): string {
    return this.webserverurl;
  }

}
