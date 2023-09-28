import { Injectable } from '@angular/core';

export enum WebserverUrls {
  TEST = 'https://prophane.de/prophane_test/',
  PRODUCTION = 'https://prophane.de/prophane/',
}

export enum Endpoints {
  // prophane
  PROPHANE_DELETE_JOB = 'prophaneDeleteJob',
  PROPHANE_REQUEST_JOB = 'prophaneRequestJob',
  PROPHANE_SAVE_JOB_FORM = 'prophaneSaveJobForm',

  // TODO replace with single endpoint
  PROPHANE_FILEUPLOAD = 'prophaneFileUpload',

  GET_PROPHANE_JOB = 'getJob',
  GET_PROPHANE_JOBS = 'prophaneJobList',
}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {
  public getURL(endpoint: Endpoints): string {
    //return WebserverUrls.TEST + endpoint;
    return WebserverUrls.TEST + endpoint;
  }
}
