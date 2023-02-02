/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassifierResponse } from '../../models/classifier-response.model';
import { OverviewResponse } from '../../models/overview-response.model';
import { PreprocessingResponse } from '../../models/preprocessing-response.model';
import { WrapperResponse } from '../../models/wrapper-response.model';
import {
  OfsHttpClientService,
  RequestObject,
} from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OfsJob, OfsJobState } from '../models/ofs-job.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { WrapperConfig } from '../models/wrapper.model';

type InputConfig =
  | OverviewConfig
  | PreprocessingConfig
  | WrapperConfig
  | ClassifierConfig;

@Injectable({
  providedIn: 'any',
})
export class WorkflowService {
  ofsJob: OfsJob;
  ofsJobs: OfsJob[];

  overviewImages: OverviewResponse;
  preprocessingImages: PreprocessingResponse;
  wrapperImages: WrapperResponse;
  classifierImages: ClassifierResponse;

  loading: Boolean;

  overviewConfig: OverviewConfig;
  preprocessingConfig: PreprocessingConfig;
  wrapperConfig: WrapperConfig;
  classifierConfig: ClassifierConfig;

  constructor(private http: OfsHttpClientService, private router: Router) {
    this.ofsJob = {
      jobId: '',
      state: OfsJobState.NOJOB,
    };
  }

  loadJobsFromStorage() {
    // load ids of created jobs from local storage
  }

  writeJobToStorage(job: OfsJob) {
    // write job to local storage
  }

  deleteJobsInStorage(jobs: OfsJob[]) {
    // delete jobs in local storage
  }

  getJobFromServer(jobId: string) {
    /**
     * Retrives job data for the specified job from server and updates job in local storage
     * @param {OfsJob} jobId id of requested job
     */
    this.loading = true;
    this.http
      .dummyHttpRequest('getJob/', {
        job: this.ofsJob,
        configData: undefined,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.writeJobToStorage(response.job); // update job state in local storage
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  createOfsJob() {
    /**
     * Requests new job from server
     */
    this.loading = true;
    this.http
      .dummyHttpRequest('createjob/', {
        job: this.ofsJob,
        configData: undefined,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.writeJobToStorage(response.job);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  submitOverviewInput(overviewConfig: OverviewConfig) {
    this.overviewConfig = overviewConfig;

    this.loading = true;
    this.http
      .dummyHttpRequest('overviewinput/', {
        job: this.ofsJob,
        configData: overviewConfig,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.overviewImages = response.responsenData as OverviewResponse;

          this.writeJobToStorage(response.job);

          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    // perform http post and wait until
    // data are validated
    // overview graphics are generated
    // overview result graphics are received
  }

  submitPreprocessingInput(preprocessingConfig: PreprocessingConfig) {
    this.preprocessingConfig = preprocessingConfig;

    this.loading = true;
    this.http
      .dummyHttpRequest('preprocessinginput/', {
        job: this.ofsJob,
        configData: preprocessingConfig,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.preprocessingImages =
            response.responsenData as PreprocessingResponse;

          this.writeJobToStorage(response.job);

          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  submitWrapperInput(wrapperConfig: WrapperConfig) {
    this.wrapperConfig = wrapperConfig;

    this.loading = true;
    this.http
      .dummyHttpRequest('wrapperinput/', {
        job: this.ofsJob,
        configData: wrapperConfig,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.wrapperImages = response.responsenData as WrapperResponse;

          this.writeJobToStorage(response.job);

          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  submitResultsInput(classifierConfig: ClassifierConfig) {
    this.classifierConfig = classifierConfig;
    this.loading = true;

    this.router.navigate(['workflow', 'results']);
    this.http
      .dummyHttpRequest('classifierinput/', {
        job: this.ofsJob,
        configData: classifierConfig,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          this.classifierImages = response.responsenData as ClassifierResponse;

          this.writeJobToStorage(response.job);

          console.log(response);
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  submitConfig(config: InputConfig) {
    this.loading = true;
    let api: ConfigEndpoints;

    if (config instanceof OverviewConfig) {
      api = ConfigEndpoints.OVERVIEW_INPUT;
    }
  }

  getDownloadData() {}
}
