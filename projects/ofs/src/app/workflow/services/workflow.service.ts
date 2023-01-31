/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { Injectable } from '@angular/core';
import { OverviewResponse } from '../../models/overview-response.model';
import { OfsHttpClientService } from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OfsJob, OfsJobState } from '../models/ofs-job.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { WrapperConfig } from '../models/wrapper.model';

@Injectable({
  providedIn: 'any',
})
export class WorkflowService {
  ofsJob: OfsJob;
  ofsJobs: OfsJob[];

  overviewImages: OverviewResponse;

  loading: Boolean;

  private overviewConfig: OverviewConfig;
  private preprocessingConfig: PreprocessingConfig;
  private wrapperConfig: WrapperConfig;
  private classifierConfig: ClassifierConfig;

  constructor(private http: OfsHttpClientService) {
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

  submitPreprocessingInput() {}

  submitWrapperInput() {}

  submitResultsInput() {}

  getDownloadData() {}
}
