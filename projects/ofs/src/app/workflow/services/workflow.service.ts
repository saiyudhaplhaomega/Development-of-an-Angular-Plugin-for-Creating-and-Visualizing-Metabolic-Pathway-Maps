/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { ClassifierResponse } from '../../models/classifier-response.model';
import { Endpoints } from '../../models/endpoints.model';
import { OverviewResponse } from '../../models/overview-response.model';
import { PreprocessingResponse } from '../../models/preprocessing-response.model';
import { WrapperResponse } from '../../models/wrapper-response.model';
import { MultiFileUploadData } from '../../services/http-client.service';
import {
  OfsHttpClientService,
  RequestObject,
} from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OfsJob, OfsJobState } from '../models/ofs-job.model';
import {
  GroupSelectionOptions,
  OverviewConfig,
  OverviewConfigForRequest,
} from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { Step, steps } from '../models/workflow-steps.model';
import { WrapperConfig } from '../models/wrapper.model';

export type InputConfig =
  | File
  | OverviewConfigForRequest
  | OverviewConfig
  | PreprocessingConfig
  | WrapperConfig
  | ClassifierConfig;

@Injectable({
  providedIn: 'any',
})
export class WorkflowService {
  loading: Boolean;

  subscriptions: Subscription[];

  ofsJob: OfsJob;
  ofsJobs: OfsJob[];

  overviewImages: OverviewResponse;
  preprocessingImages: PreprocessingResponse;
  wrapperImages: WrapperResponse;
  classifierImages: ClassifierResponse;

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

  setRoute(selectedIndex: number) {
    return this.router.navigate(['workflow', steps[selectedIndex].route]);
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
      .getObject<RequestObject>(Endpoints.CREATE_JOB, new HttpParams())
      // .dummyHttpRequest('createjob/', {
      //   job: this.ofsJob,
      //   configData: undefined,
      //   responsenData: undefined,
      // })
      .subscribe({
        next: (response) => {
          console.log(response);
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

  submitConfig(config: InputConfig, api: Endpoints) {
    this.loading = true;
    let callback = (response: RequestObject) => {};

    switch (api) {
      case Endpoints.OVERVIEW_INPUT:
        callback = (response) => {
          this.overviewImages = response.responsenData as OverviewResponse;
          this.overviewConfig = response.configData as OverviewConfig;
        };
        break;
      case Endpoints.PREPROCESSING_INPUT:
        callback = (response) => {
          this.preprocessingImages =
            response.responsenData as PreprocessingResponse;
          this.preprocessingConfig = response.configData as PreprocessingConfig;
        };
        break;
      case Endpoints.WRAPPER_INPUT:
        callback = (response) => {
          this.wrapperImages = response.responsenData as WrapperResponse;
          this.wrapperConfig = response.configData as WrapperConfig;
        };
        break;
      case Endpoints.CLASSIFIER_INPUT:
        callback = (response) => {
          this.classifierImages = response.responsenData as ClassifierResponse;
          this.classifierConfig = response.configData as ClassifierConfig;
        };
        break;
    }

    switch (api) {
      case Endpoints.OVERVIEW_INPUT:
        let filesToUpload: MultiFileUploadData;

        const overviewConfigForRequest: OverviewConfigForRequest = {
          groups: (config as OverviewConfig).groups,
          groupSelectionOption: (config as OverviewConfig).groupSelectionOption,
        };
        // TODO: request object für alles
        const configForRequest: RequestObject = {
          configData: (config as OverviewConfig).data,
          job: this.ofsJob,
          responsenData: undefined,
        };

        const configFile = new File(
          [JSON.stringify(overviewConfigForRequest)],
          'config'
        );

        filesToUpload = {
          files: [
            {
              uploadFile: (config as OverviewConfig).data,
              fileID: 'inputCSV',
            },
            {
              uploadFile: configFile,
              fileID: 'inputJSON',
            },
          ],
          httpParameters: new HttpParams(),
        };

        this.http.performUpload(
          'TODO: dialog id',
          filesToUpload,
          Endpoints.OVERVIEW_INPUT
        );
        break;
      case Endpoints.PREPROCESSING_INPUT:
      case Endpoints.WRAPPER_INPUT:
      case Endpoints.CLASSIFIER_INPUT:
        // TODO post
        this.http
          .postObject<RequestObject, RequestObject>(
            configForRequest,
            api,
            new HttpParams()
          )
          .subscribe((response) => {
            console.log(response);
          });
        break;
    }

    this.http
      .dummyHttpRequest(api, {
        job: this.ofsJob,
        configData: config,
        responsenData: undefined,
      })
      .subscribe({
        next: (response) => {
          this.ofsJob = response.job;
          callback(response);

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

  getDownloadData() {}
}
