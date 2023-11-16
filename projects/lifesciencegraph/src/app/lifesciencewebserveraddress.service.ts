import {Injectable} from '@angular/core';

export enum WebserverUrls {
  LOCALHOST = 'http://localhost:9500/graph/'
}

export enum Endpoints {
  QUERY = 'query/',
}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {

  constructor() {
  }

  public getEndpoint(endpoint: string): string {
    return WebserverUrls.LOCALHOST + endpoint;
  }

}
