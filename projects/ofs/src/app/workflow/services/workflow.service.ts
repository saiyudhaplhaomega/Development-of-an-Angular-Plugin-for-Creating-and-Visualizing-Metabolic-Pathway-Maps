/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  repeat,
  retry,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { Endpoints } from '../../models/endpoints.model';
import { MultiFileUploadData } from '../../services/http-client.service';
import { OfsHttpClientService } from '../../services/ofs-http-client.service';
import { ClassifierConfig, Feature } from '../models/classifier.model';
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

  // ofsData: OFSData;
  ofsData$ = new BehaviorSubject<OFSData>(undefined);
  featureSubject = new BehaviorSubject<Feature[]>([]);

  constructor(private http: OfsHttpClientService, private router: Router) {
    // this.ofsData = new OFSData();
    this.ofsData$.next(new OFSData());
  }

  get ofsData() {
    return this.ofsData$.value;
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
          this.ofsData$.next(response);
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

  // submitResultsInput(classifierConfig: ClassifierConfig) {
  //   this.ofsData.configData.classifierConfig = classifierConfig;
  //   this.loading = true;
  //   this.router.navigate(['workflow', 'results']);
  // }

  submitConfig(config: InputConfig, api: Endpoints) {
    this.loading = true;

    const currentOfsData = this.ofsData$.value;

    switch (api) {
      case Endpoints.OVERVIEW_INPUT:
        currentOfsData.configData.overviewConfig = config as OverviewConfig;
        this.ofsData$.next(currentOfsData);

        const configFile = new File(
          [JSON.stringify(this.ofsData$.value)],
          'config'
        );

        console.log(JSON.stringify(this.ofsData$.value));

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
            this.ofsData$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.OVERVIEW_RESOURCE_AVAIL,
            new HttpParams()
          )
          .pipe(
            repeat({ delay: 5_000 }),
            filter(
              (res: OFSData) =>
                res.responseData?.overviewResponse.dataSparsity !== undefined
            ),
            take(1)
          )
          .subscribe((response: OFSData) => {
            // TODO: set testgroup and control group names on the server!
            response.responseData.overviewResponse.testGroups =
              currentOfsData.configData.overviewConfig.groups
                .slice(1)
                .map((group) => {
                  return group.groupName;
                });
            response.responseData.overviewResponse.controlGroup =
              currentOfsData.configData.overviewConfig.groups[0].groupName;
            this.ofsData$.next(response);
            this.loading = false;
          });
        break;

      case Endpoints.PREPROCESSING_INPUT:
        currentOfsData.configData.preprocessingConfig =
          config as PreprocessingConfig;
        this.ofsData$.next(currentOfsData);

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.PREPROCESSING_INPUT
          )
          .subscribe((response: OFSData) => {
            this.ofsData$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.PREPROCESSING_RESOURCE_AVAIL,
            new HttpParams()
          )
          .pipe(
            repeat({ delay: 5_000 }),
            filter(
              (res: OFSData) =>
                res.responseData?.preprocessingResponse
                  .predictivePerformance !== undefined
            ),
            take(1)
          )
          .subscribe((response: OFSData) => {
            this.ofsData$.next(response);
            this.loading = false;
          });
        break;

      case Endpoints.WRAPPER_INPUT:
        const incompleteConfig = config as WrapperConfig;
        incompleteConfig.pvalCutoff =
          currentOfsData.configData.wrapperConfig.pvalCutoff;
        currentOfsData.configData.wrapperConfig = incompleteConfig;
        this.ofsData$.next(currentOfsData);

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.WRAPPER_INPUT
          )
          .subscribe((response: OFSData) => {
            this.ofsData$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.WRAPPER_RESOURCE_AVAIL,
            new HttpParams()
          )
          .pipe(
            repeat({ delay: 5_000 }),
            filter(
              (res: OFSData) =>
                res.responseData?.wrapperResponse.featureSelection !== undefined
            ),
            take(1)
          )
          .subscribe((response: OFSData) => {
            this.ofsData$.next(response);
            this.featureSubject.next(
              response.responseData.wrapperResponse.featureSelection
            );
            this.loading = false;
          });
        break;

      case Endpoints.CLASSIFIER_INPUT:
        currentOfsData.configData.classifierConfig = config as ClassifierConfig;
        this.ofsData$.next(currentOfsData);
        // this.router.navigate(['workflow', 'results']);

        // TODO post
        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.CLASSIFIER_INPUT,
            new HttpParams()
          )
          .subscribe((response) => {
            this.ofsData$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsData$.value,
            Endpoints.CLASSIFIER_RESOURCES,
            new HttpParams()
          )
          .pipe(
            repeat({ delay: 2_000 }),
            filter(
              (res: OFSData) =>
                res.responseData?.classifierResponse.pcaImage !== undefined
            ),
            take(1)
          )
          .subscribe((response: OFSData) => {
            this.ofsData$.next(response);
            this.loading = false;
          });
        break;
    }
  }
}
