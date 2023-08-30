import {Injectable} from '@angular/core';

export enum WebserverUrls {
  TEST = 'https://prophane.de:9091/mpacloud/v1/',
}

export enum Endpoints {

  // prophane
  PROPHANE_DELETE_JOB = 'prophaneDeleteJob',
  PROPHANE_REQUEST_JOB = 'prophaneRequestJob',
  PROPHANE_SAVE_JOB_FORM = 'prophaneSaveJobForm',
  PROPHANE_START_JOB = 'prophaneStartJob',
  UPLOAD_PROPHANE_FASTA = 'prophaneFasta',
  UPLOAD_PROPHANE_CSV = 'prophaneCSV',
  GET_PROPHANE_JOB = 'getJob',
  GET_PROPHANE_JOBS = 'prophaneJobList',

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
