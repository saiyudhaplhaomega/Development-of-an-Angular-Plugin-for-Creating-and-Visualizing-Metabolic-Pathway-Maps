/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { OfsHttpClientService } from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { WrapperConfig } from '../models/wrapper.model';

export enum RequestState {
  CREATED = 'created',
  SUCCESS = 'success',
  FAIL = 'fail',
}

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

@Injectable({
  providedIn: 'any',
})
export class WorkflowService {
  ofsJob$: BehaviorSubject<OfsJob>;

  private overviewConfig: OverviewConfig;
  private preprocessingConfig: PreprocessingConfig;
  private wrapperConfig: WrapperConfig;
  private classifierConfig: ClassifierConfig;

  overviewRequest$: Observable<RequestState>;

  constructor(private http: OfsHttpClientService) {
    this.ofsJob$ = new BehaviorSubject({
      jobId: '',
      state: OfsJobState.NOJOB,
    });
  }

  get ofsJob(): Observable<OfsJob> {
    return this.ofsJob$;
  }

  getCurrentJob(jobId: string) {
    // get job information from server
    const job = { jobId: jobId, state: OfsJobState.WAITING };
    this.http.dummyHttpGet('dummy/' + jobId).subscribe();
  }

  createOfsJob() {
    this.ofsJob$.next({ jobId: '', state: OfsJobState.CREATED });
  }

  submitOverviewInput(overviewConfig: OverviewConfig) {
    this.overviewConfig = overviewConfig;
    // perform http post and wait until
    // data are validated
    // overview graphics are generated
    // overview result graphics are received
  }

  submitPreprocessingInput() {}

  submitWrapperInput() {}

  submitResultsInput() {}

  getDownloadData() {}
}
