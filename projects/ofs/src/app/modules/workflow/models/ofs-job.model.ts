export enum OfsJobState {
  NOJOB = 'nojob',
  WAITING = 'waiting',
  CREATED = 'created',
  CREATIONFAIL = 'creationfail',
  OVERVIEW_INPUT = 'overviewinput',
  OVERVIEW_RESULTS = 'overviewresults',
  OVERVIEW_FAIL = 'overviewfail',
  PREPROCESSING_INPUT = 'preprocessinginput',
  PREPROCESSING_RESULTS = 'preprocessingresults',
  PREPROCESSING_FAIL = 'preprocessingfail',
  WRAPPER_INPUT = 'wrapperinput',
  WRAPPER_RESULTS = 'wrapperresults',
  WRAPPER_FAIL = 'wrapperfail',
  RESULTS = 'results',
  RESULTS_FAIL = 'resultsfail',
}

export interface OfsJob {
  jobId: string;
  state: OfsJobState;
}
