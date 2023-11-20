import {Injectable} from '@angular/core';

export enum WebserverUrls {
  TEST = 'https://www.prophane.de:9091/test/',
  PROPHANE = 'https://www.prophane.de:9091/',
  LOCALHOST = 'http://localhost:80/'
}

export enum Endpoints {

  // TODO: split into MPA_SEARCH and PROPHANE
  FILES_UPLOAD='mpasearch/searchfilesupload',

  UNIMPLEMENTED = '',

  // GET_EXPERIMENT = 'mpacloud/v1/getExperiment',
  // ADD_DB_EXPERIMENT = 'mpacloud/v1/addexperiment',
  // ADD_STREAMING_SESSION = 'mpacloud/v1/addstreamingsession',
  // UPDATE_EXPERIMENT = 'mpacloud/v1/updateExperiment',
  // LIST_STREAMINGSESSIONS = 'mpacloud/v1/liststreamingsessions',

  // results
  GET_PROTEIN_GROUPS = 'mparesults/getproteingroups',
  GET_DOWNLOADPROTEINGROUPS = 'mparesults/getproteingroupsdownload',
  POST_UPDATE_PROTEIN_GROUPS = 'mparesults/updateproteingroups',

  // LIST_DB_EXPERIMENTS = 'mpacloud/v1/listexperiments',


  // user
  UPDATE_USER_DATA = 'mpauser/updateuserdata',
  GET_USER_DATA = 'mpauser/getuserdata',
  // experiment
  CREATE_EXPERIMENT = 'mpasearch/createexperiment',
  GET_EXPERIMENT_DATA = 'mpasearch/getexperimentdata',
  CREATE_COMPARISON = 'mpasearch/createcomparison',
  UPDATE_EXPERIMENT_DATA = 'mpasearch/updateexperimentdata',
  SEARCH_METADATA = 'mpasearch/searchmetadata',
  SEARCH_UPLOAD = 'mpasearch/searchfileupload',
  GET_PROTEIN_SEQUENCE = 'mpasearch/getproteinsequence',
  GET_SPECTRUMDATA = 'mpasearch/getspectrumdata',
  // proteinloader
  PROTEINLOADER_METADATA = 'proteinloader/fastametadata',
  PROTEINLOADER_FILEUPLOAD = 'proteinloader/uploadprotdb',
  PROTEINLOADER_GET_PROTDBDATA = 'proteinloader/getprotdbdata',
  PROTEINLOADER_UPDATE_PROTDBDATA= 'proteinloader/updateprotdbdata',
  // PROTEINLOADER_STATUS = 'proteinloader/jobstatus',
  DOWNLOAD_PROPHANE_TEST_DATA = ""


}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {

  constructor() {
  }

  public getEndpoint(endpoint: string): string {
    //return WebserverUrls.PROPHANE + endpoint;
    return WebserverUrls.TEST + endpoint;
  }

}
