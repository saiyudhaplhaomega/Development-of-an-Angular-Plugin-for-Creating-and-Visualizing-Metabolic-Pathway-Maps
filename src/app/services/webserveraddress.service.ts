///<reference path="../../../node_modules/rxjs/internal/Subject.d.ts"/>
import {Injectable} from '@angular/core';

@Injectable()
export class WebserveraddressService {

/*   webserverurl = 'http://localhost:8080/';*/
  webserverurl = 'http://129.70.51.126:9092/';

  constructor() {
  }

  public getwebserverurl(): string {
    return this.webserverurl;
  }

}
