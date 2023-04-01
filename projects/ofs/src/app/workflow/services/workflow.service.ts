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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DeepReadonly } from 'ts-essentials';
import { cloneDeep } from 'lodash';
import { Endpoints } from '../../models/endpoints.model';
import { MultiFileUploadData } from '../../services/http-client.service';
import { OfsHttpClientService } from '../../services/ofs-http-client.service';
import { ClassifierConfig } from '../models/classifier.model';
import { OFSData } from '../models/ofs-data.model';
import { OfsJob } from '../models/ofs-job.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { steps } from '../models/workflow-steps.model';
import { WrapperConfig } from '../models/wrapper.model';
import { dummyConfig } from 'projects/ofs/src/assets/dummy-config';

export interface SimpleMessage {
  message: string;
}

@Injectable({
  providedIn: 'any',
})
// TODO: control current step from here
export class WorkflowService {
  loading: Boolean;
  subscriptions: Subscription[];

  ofsDataSubject$ = new BehaviorSubject<OFSData>(undefined);

  constructor(private http: OfsHttpClientService, private router: Router) {
    this.ofsDataSubject$.next(new OFSData());
  }

  // use this getter if you only need the current value
  get ofsData(): DeepReadonly<OFSData> {
    return this.ofsDataSubject$.value;
  }

  get ofsDataClone(): OFSData {
    return cloneDeep(this.ofsData);
  }

  set wrapperInputConfigPval(value: number) {
    const newData = this.ofsDataClone;
    newData.configData.wrapperConfig.pvalCutoff = value;

    this.ofsDataSubject$.next(newData);
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

  setDummyConfig() {
    this.ofsDataSubject$.next(dummyConfig as OFSData);
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

  // TODO: Oveviewconfig.data is not included in response from server, remove from object for consistency
  submitOverViewConfig(config: OverviewConfig) {
    this.loading = true;
    const currentOfsData = this.ofsDataClone;

    currentOfsData.configData.overviewConfig = config;
    this.ofsDataSubject$.next(currentOfsData);

    const configFile = new File(
      [JSON.stringify(this.ofsDataSubject$.value)],
      'config'
    );

    const filesToUpload: MultiFileUploadData = {
      files: [
        {
          uploadFile: config.data,
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
      .repeatedPostObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        'responseData.overviewResponse.dataSparsity',
        Endpoints.OVERVIEW_RESOURCE_AVAIL,
        new HttpParams()
      )
      .subscribe((response: OFSData) => {
        // TODO: set testgroup and control group names on the server!
        response.responseData.overviewResponse.testGroups =
          this.ofsData.configData.overviewConfig.groups
            .slice(1)
            .map((group) => {
              return group.groupName;
            });
        response.responseData.overviewResponse.controlGroup =
          this.ofsData.configData.overviewConfig.groups[0].groupName;
        this.ofsDataSubject$.next(response);
        this.loading = false;
      });
  }

  submitPreprocessingConfig(config: PreprocessingConfig) {
    this.loading = true;
    const currentOfsData = this.ofsDataClone;

    currentOfsData.configData.preprocessingConfig = config;
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
      .repeatedPostObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        'responseData.preprocessingResponse.predictivePerformance',
        Endpoints.PREPROCESSING_RESOURCE_AVAIL,
        new HttpParams()
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.loading = false;
      });
  }

  submitWrapperConfig(config: WrapperConfig) {
    this.loading = true;
    const currentOfsData = this.ofsDataClone;
    const incompleteConfig = config;

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
      .repeatedPostObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        'responseData.wrapperResponse.featureSelection',
        Endpoints.WRAPPER_RESOURCE_AVAIL,
        new HttpParams()
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.loading = false;
      });
  }

  submitClassifierConfig(config: ClassifierConfig) {
    this.setRoute(3);
    this.loading = true;
    const currentOfsData = this.ofsDataClone;

    currentOfsData.configData.classifierConfig = config;
    this.ofsDataSubject$.next(currentOfsData);

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
      .repeatedPostObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        'responseData.classifierResponse.pcaImage',
        Endpoints.CLASSIFIER_RESOURCES,
        new HttpParams()
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.loading = false;
      });
  }
}
