export enum Endpoints {
  // INPUT_FILE_UPLOAD = 'uploadofsfile/',
  CREATE_JOB = 'createjob',
  GET_JOBS = 'getjobs',
  OVERVIEW_RESOURCE_AVAIL = 'resource',
  OVERVIEW_INPUT = 'overviewinput',
  PREPROCESSING_INPUT = 'preprocessinginput',
  WRAPPER_INPUT = 'wrapperinput',
  CLASSIFIER_INPUT = 'classifierinput',
}

export function getAdress(api: Endpoints) {
  return 'http://localhost:8080/test/ofs/' + api;
}
