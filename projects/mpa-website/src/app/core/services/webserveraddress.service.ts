import {Injectable} from '@angular/core';

export enum WebserverUrls {
  TEST = 'https://www.prophane.de:9091/test/',
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

  // LIST_DB_EXPERIMENTS = 'mpacloud/v1/listexperiments',

  // prophane
  PROPHANE_DELETE_JOB = 'mpacloud/v1/prophaneDeleteJob',
  PROPHANE_REQUEST_JOB = 'mpacloud/v1/prophaneRequestJob',
  PROPHANE_SAVE_JOB_FORM = 'mpacloud/v1/prophaneSaveJobForm',
  PROPHANE_START_JOB = 'mpacloud/v1/prophaneStartJob',
  UPLOAD_PROPHANE_FASTA = 'mpacloud/v1/prophaneFasta',
  UPLOAD_PROPHANE_CSV = 'mpacloud/v1/prophaneCSV',
  GET_PROPHANE_JOB = 'mpacloud/v1/getJob/',
  GET_PROPHANE_JOBS = 'mpacloud/v1/prophaneJobList',
  // user
  UPDATE_USER_DATA = 'mpauser/updateuserdata',
  GET_USER_DATA = 'mpauser/getuserdata',
  // experiment
  CREATE_EXPERIMENT = 'mpasearch/createexperiment',
  GET_EXPERIMENT_DATA = 'mpasearch/getexperimentdata',
  SEARCH_METADATA = 'mpasearch/searchmetadata',
  SEARCH_UPLOAD = 'mpasearch/searchfileupload',
  GET_PROTEIN_SEQUENCE = 'mpasearch/getproteinsequence',
  GET_SPECTRUMDATA = 'mpasearch/getspectrumdata',
  // proteinloader
  PROTEINLOADER_METADATA = 'proteinloader/fastametadata',
  PROTEINLOADER_FILEUPLOAD = 'proteinloader/uploadfasta',
  // PROTEINLOADER_STATUS = 'proteinloader/jobstatus',

}

@Injectable({
  providedIn: 'root',
})
export class WebserveraddressService {

  constructor() {
  }

  public getEndpoint(endpoint: string): string {
    return WebserverUrls.TEST + endpoint;
  }

}
