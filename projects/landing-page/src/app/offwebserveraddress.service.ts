import {Injectable} from '@angular/core';

export enum WebserverUrls {
  // TEST = 'https://www.prophane.de:9091/test/',
  // PROPHANE = 'https://www.prophane.de:9091/',
  LOCALHOST = 'http://localhost:8080/test/ofs/'
}

export enum Endpoints {
  CREATE_JOB = 'createjob',
  GET_JOBS = 'getjobs',
  OVERVIEW_INPUT = 'overviewinput',
  OVERVIEW_RESOURCE_AVAIL = 'overviewresources',
  PREPROCESSING_INPUT = 'preprocessinginput',
  PREPROCESSING_RESOURCE_AVAIL = 'preprocessingresources',
  WRAPPER_INPUT = 'wrapperinput',
  WRAPPER_RESOURCE_AVAIL = 'wrapperresources',
  CLASSIFIER_INPUT = 'classifierinput',
  CLASSIFIER_RESOURCES = 'classifierresources',
}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {

  constructor() {
  }

  public getEndpoint(endpoint: string): string {
    //return WebserverUrls.PROPHANE + endpoint;
    return WebserverUrls.LOCALHOST + endpoint;
  }

}
