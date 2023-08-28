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

  // prophane
  PROPHANE_DELETE_JOB = 'mpacloud/v1/prophaneDeleteJob',
  PROPHANE_REQUEST_JOB = 'mpacloud/v1/prophaneRequestJob',
  PROPHANE_SAVE_JOB_FORM = 'mpacloud/v1/prophaneSaveJobForm',
  PROPHANE_START_JOB = 'mpacloud/v1/prophaneStartJob',
  UPLOAD_PROPHANE_FASTA = 'mpacloud/v1/prophaneFasta',
  UPLOAD_PROPHANE_CSV = 'mpacloud/v1/prophaneCSV',
  GET_PROPHANE_JOB = 'mpacloud/v1/getJob',
  GET_PROPHANE_JOBS = 'mpacloud/v1/prophaneJobList',
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
  PROTEINLOADER_FILEUPLOAD = 'proteinloader/uploadfasta',
  PROTEINLOADER_GETFASTADATA = 'proteinloader/getfastadata',
  PROTEINLOADER_UPDATE_FASTADATA= 'proteinloader/updatefastadata',
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
    //return WebserverUrls.TEST + endpoint;
    return WebserverUrls.PROPHANE + endpoint;
  }

}
