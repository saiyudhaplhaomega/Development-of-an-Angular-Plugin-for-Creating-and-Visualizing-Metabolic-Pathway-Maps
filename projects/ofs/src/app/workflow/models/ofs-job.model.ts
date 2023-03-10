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

export class OfsJob {
  private _jobId: string;
  private _state: OfsJobState;

  constructor() {
    this.jobId = '';
    this.state = OfsJobState.NOJOB;
  }

  get jobId(): string {
    return this._jobId;
  }

  set jobId(value: string) {
    this._jobId = value;
  }

  get state(): OfsJobState {
    return this._state;
  }

  set state(value: OfsJobState) {
    this._state = value;
  }
}
