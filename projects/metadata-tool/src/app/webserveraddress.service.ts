import {Injectable} from '@angular/core';

export enum WebserverUrls {
  TEST = 'http://localhost:9500/metadata/service/',
}

export enum Endpoints {

  UPLOAD_FILES = 'uploadfiles',
  GET_INITIAL_METADATA = 'getmetadatajson',
  SUBMIT_METADATA = 'submitmetadata',
  GET_DOWNLOAD_LINKS = 'getdownload',

}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {

  constructor() {
  }

  public getURL(endpoint: Endpoints): string {
    //return WebserverUrls.TEST + endpoint;
    return WebserverUrls.TEST + endpoint;
  }

}
