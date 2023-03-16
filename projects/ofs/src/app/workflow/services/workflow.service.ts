/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, repeat, retry, Subscription, take } from 'rxjs';
import { Endpoints } from '../../models/endpoints.model';
import { MultiFileUploadData } from '../../services/http-client.service';
import { OfsHttpClientService } from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OFSData } from '../models/ofs-data.model';
import { OfsJob } from '../models/ofs-job.model';
import {
  OverviewConfig,
  OverviewConfigForRequest,
} from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { steps } from '../models/workflow-steps.model';
import { WrapperConfig } from '../models/wrapper.model';

export type InputConfig =
  | File
  | OverviewConfigForRequest
  | OverviewConfig
  | PreprocessingConfig
  | WrapperConfig
  | ClassifierConfig;

export interface SimpleMessage {
  message: string;
}

@Injectable({
  providedIn: 'any',
})
export class WorkflowService {
  loading: Boolean;

  subscriptions: Subscription[];

  ofsData: OFSData;

  constructor(private http: OfsHttpClientService, private router: Router) {
    this.ofsData = new OFSData();
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
  }

  createOfsJob() {
    /**
     * Requests new job from server
     */
    this.loading = true;
    this.http
      .getObject<OFSData>(Endpoints.CREATE_JOB, new HttpParams())
      .subscribe({
        next: (response: OFSData) => {
          console.log(response);
          this.ofsData.job = response.job;
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
    this.ofsData.configData.classifierConfig = classifierConfig;
    this.loading = true;
    this.router.navigate(['workflow', 'results']);
  }

  submitConfig(config: InputConfig, api: Endpoints) {
    this.loading = true;

    switch (api) {
      case Endpoints.OVERVIEW_INPUT:
        this.ofsData.configData.overviewConfig = config as OverviewConfig;

        const configData = JSON.stringify(this.ofsData);
        console.log(configData);
        console.log(this.ofsData);

        const configFile = new File([configData], 'config');

        const filesToUpload: MultiFileUploadData = {
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

        this.http
          .postMultiPartFiles(filesToUpload, Endpoints.OVERVIEW_INPUT)
          .subscribe((response: OFSData) => {
            console.log(response);

            this.ofsData = response;
          });

        this.http
          .getObject<SimpleMessage>(
            Endpoints.OVERVIEW_RESOURCE_AVAIL,
            new HttpParams({ fromObject: { jobid: this.ofsData.job.jobId } })
          )
          .pipe(
            repeat({ delay: 2_000 }),
            filter((res: SimpleMessage) => res.message === 'OK.'),
            take(1)
          )
          .subscribe(() => (this.loading = false));
        break;
      case Endpoints.PREPROCESSING_INPUT:
        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData,
            Endpoints.PREPROCESSING_INPUT
          )
          .subscribe((response: OFSData) => {
            this.ofsData = response;
          });
        this.http
          .getObject<SimpleMessage>(
            Endpoints.OVERVIEW_RESOURCE_AVAIL,
            new HttpParams({ fromObject: { jobid: this.ofsData.job.jobId } })
          )
          .pipe(
            repeat({ delay: 2_000 }),
            filter((res: SimpleMessage) => res.message === 'OK.'),
            take(1)
          )
          .subscribe(() => (this.loading = false));
        break;
      case Endpoints.WRAPPER_INPUT:
      case Endpoints.CLASSIFIER_INPUT:
        // TODO post
        this.http
          .postObject<OFSData, OFSData>(this.ofsData, api, new HttpParams())
          .subscribe((response) => {
            // TODO: evaluate response!
            console.log(response);
            this.loading = false;
          });
        break;
    }
  }
}
