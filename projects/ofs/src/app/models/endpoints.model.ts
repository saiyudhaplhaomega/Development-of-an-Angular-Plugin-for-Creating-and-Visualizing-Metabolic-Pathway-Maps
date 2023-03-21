export enum Endpoints {
  // INPUT_FILE_UPLOAD = 'uploadofsfile/',
  CREATE_JOB = 'createjob',
  GET_JOBS = 'getjobs',
  OVERVIEW_INPUT = 'overviewinput',
  OVERVIEW_RESOURCE_AVAIL = 'overviewresources',
  PREPROCESSING_INPUT = 'preprocessinginput',
  PREPROCESSING_RESOURCE_AVAIL = 'preprocessingresources',
  WRAPPER_INPUT = 'wrapperinput',
  WRAPPER_RESOURCE_AVAIL = 'wrapperresources',
  CLASSIFIER_INPUT = 'classifierinput',
}

export function getAdress(api: Endpoints) {
  return 'http://localhost:8080/test/ofs/' + api;
}
