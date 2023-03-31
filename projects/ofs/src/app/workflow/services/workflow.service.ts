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
  Observable,
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
  ofsDataSubject$ = new BehaviorSubject<OFSData>(undefined);
  featureSubject = new BehaviorSubject<Feature[]>([]);

  constructor(private http: OfsHttpClientService, private router: Router) {
    this.ofsDataSubject$.next(new OFSData());
  }

  // use this getter if you only need the current value
  get ofsData() {
    return this.ofsDataSubject$.value;
  }

  // use this getter if you want to react to changes of the data object
  get ofsData$(): Observable<OFSData> {
    return this.ofsDataSubject$;
  }

  getResourceUrls(resources: string[]) {
    const urls = [];
    for (let resource of resources) {
      urls.push(
        'http://localhost:8080/' + this.ofsData.job.jobId + '/' + resource
      );
    }
    return urls;
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
          this.ofsDataSubject$.next(response);
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

  // TODO: submit config as overloaded method?
  // TODO: Oveviewconfig.data is not included in response from server, remove from object for consistency
  submitConfig(config: InputConfig, api: Endpoints) {
    this.loading = true;

    const currentOfsData = this.ofsDataSubject$.value;

    switch (api) {
      case Endpoints.OVERVIEW_INPUT:
        currentOfsData.configData.overviewConfig = config as OverviewConfig;
        this.ofsDataSubject$.next(currentOfsData);

        const configFile = new File(
          [JSON.stringify(this.ofsDataSubject$.value)],
          'config'
        );

        console.log(JSON.stringify(this.ofsDataSubject$.value));

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
            this.ofsDataSubject$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
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
            this.ofsDataSubject$.next(response);
            this.loading = false;
          });
        break;

      case Endpoints.PREPROCESSING_INPUT:
        currentOfsData.configData.preprocessingConfig =
          config as PreprocessingConfig;
        this.ofsDataSubject$.next(currentOfsData);

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            Endpoints.PREPROCESSING_INPUT
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
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
            this.ofsDataSubject$.next(response);
            this.loading = false;
          });
        break;

      case Endpoints.WRAPPER_INPUT:
        const incompleteConfig = config as WrapperConfig;
        incompleteConfig.pvalCutoff =
          currentOfsData.configData.wrapperConfig.pvalCutoff;
        currentOfsData.configData.wrapperConfig = incompleteConfig;
        this.ofsDataSubject$.next(currentOfsData);

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            Endpoints.WRAPPER_INPUT
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
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
            this.ofsDataSubject$.next(response);
            this.featureSubject.next(
              response.responseData.wrapperResponse.featureSelection
            );
            this.loading = false;
          });
        break;

      case Endpoints.CLASSIFIER_INPUT:
        currentOfsData.configData.classifierConfig = config as ClassifierConfig;
        this.ofsDataSubject$.next(currentOfsData);
        // this.router.navigate(['workflow', 'results']);

        // TODO post
        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            Endpoints.CLASSIFIER_INPUT,
            new HttpParams()
          )
          .subscribe((response) => {
            this.ofsDataSubject$.next(response);
          });

        this.http
          .postObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
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
            this.ofsDataSubject$.next(response);
            this.loading = false;
          });
        break;
    }
  }
}
