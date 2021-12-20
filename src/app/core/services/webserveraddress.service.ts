import {Injectable} from '@angular/core';

export enum WebserverUrls {
  TEST = 'https://www.prophane.de:9091/test/',
  LOCALHOST = 'http://localhost:80/'
}

export enum Endpoints {

  UNIMPLEMENTED = '',

  // GET_EXPERIMENT = 'mpacloud/v1/getExperiment',
  // ADD_DB_EXPERIMENT = 'mpacloud/v1/addexperiment',
  // ADD_STREAMING_SESSION = 'mpacloud/v1/addstreamingsession',
  // UPDATE_EXPERIMENT = 'mpacloud/v1/updateExperiment',
  // LIST_STREAMINGSESSIONS = 'mpacloud/v1/liststreamingsessions',

  // results
  FETCH_PEPTIDES_PROTEIN = 'mpacloud/v1/fetchPeptidesProtein',
  FETCH_PEPTIDES_PROTEIN_GROUP = 'mpacloud/v1/fetchProteins',
  FETCH_PROTEINS = 'mpacloud/v1/fetchPeptidesProteinGroup',

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
  CREATE_EXPERIMENT = 'mpacloud/v1/createExperiment',
  POST_DAT_METADATA = 'mpacloud/v1/postuploadDatMetadata',  // TODO: check if this is correct
  POST_FASTA_METADATA = '', // TODO: add Enpoint
  POST_MGF_METADATA = 'mpacloud/v1/postMGFMetadata',
  POST_MZIDENT_METADATA = 'mpacloud/v1/postmzidentMetadata',
  POST_MZML_METADATA = 'mpacloud/v1/postMZmlMetadata',
  UPLOAD_DAT = 'mpacloud/v1/postuploadDat',
  UPLOAD_FASTA = 'mpacloud/v1/postuploadFasta',
  UPLOAD_MGF = 'mpacloud/v1/postuploadMGF',
  UPLOAD_MZIDENT = 'mpacloud/v1/postuploadmzident',
  UPLOAD_MZML = 'mpacloud/v1/postuploadMZml',
  // proteindb
  PROTEINLOADER_METADATA = 'proteinloader/fastametadata',
  PROTEINLOADER_FILEUPLOAD = 'proteinloader/uploadfasta',
  PROTEINLOADER_STATUS = 'proteinloader/jobstatus',

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
