/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 *
 */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DeepReadonly } from 'ts-essentials';
import { cloneDeep } from 'lodash';
import { MultiFileUploadData } from 'shared-lib';
import { ClassifierConfig } from '../models/classifier.model';
import { OFSData } from '../models/ofs-data.model';
import { OfsJob } from '../models/ofs-job.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { WrapperConfig } from '../models/wrapper.model';
import { dummyConfig } from 'projects/ofs/src/assets/dummy-config';
import { StepperService } from './stepper.service';
import { HttpClientService } from 'shared-lib';
import {
  WebserveraddressService,
  Endpoints,
} from '../../offwebserveraddress.service';

export interface SimpleMessage {
  message: string;
}

@Injectable({ providedIn: 'any' })
export class WorkflowService {
  loading: Boolean;

  ofsDataSubject$ = new BehaviorSubject<OFSData>(undefined);

  constructor(
    private http: HttpClientService,
    private stepperService: StepperService,
    private address: WebserveraddressService
  ) {
    this.ofsDataSubject$.next(new OFSData());

    // this.ofsDataSubject$.subscribe((data) => {
    //   console.log(data);
    // });
  }

  // TODO: remove for simplification
  // use this getter if you only need the current value
  get ofsData(): OFSData {
    return this.ofsDataSubject$.value;
  }

  //  TODO: remove
  // get ofsData(): DeepReadonly<OFSData> {
  //   return this.ofsDataSubject$.value;
  // }

  private get ofsDataClone(): OFSData {
    return this.ofsData;
    // return cloneDeep(this.ofsData);
  }

  // use this getter if you want to react to changes of the data object
  get ofsData$(): Observable<OFSData> {
    return this.ofsDataSubject$;
  }

  // used for testing, reads an existing config from assets
  setDummyConfig() {
    const existingConfig = dummyConfig as OFSData;
    this.setCompletedSteps(existingConfig);
    this.ofsDataSubject$.next(existingConfig);
  }

  // checks workflow data and sets stepper
  setCompletedSteps(data: OFSData) {
    if (data.responseData.overviewResponse?.classDistribution !== undefined) {
      this.stepperService.setStepComplete(0);
    }

    if (
      data.responseData.preprocessingResponse?.predictivePerformance !==
      undefined
    ) {
      this.stepperService.setStepComplete(1);
    }

    if (data.configData.classifierConfig?.selectedFeatures !== undefined) {
      this.stepperService.setStepComplete(2);
    }

    if (data.responseData.classifierResponse?.pcaImage !== undefined) {
      this.stepperService.setStepComplete(3);
    }
  }

  createOfsJob() {
    /**
     * Requests new job from server
     */
    this.loading = true;
    this.http
      .getObject<OFSData>(
        this.address.getEndpoint(Endpoints.CREATE_JOB),
        new HttpParams()
      )
      .subscribe({
        next: (response: OFSData) => {
          this.ofsDataSubject$.next(response);
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
      .postMultiPartFiles(
        filesToUpload,
        this.address.getEndpoint(Endpoints.OVERVIEW_INPUT)
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.http
          .repeatedPostObject<OFSData, OFSData>(
            response,
            'responseData.overviewResponse.dataSparsity',
            this.address.getEndpoint(Endpoints.OVERVIEW_RESOURCE_AVAIL),
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
            // TODO: use one method for setting steps? --> setCompletedSteps
            this.stepperService.setStepComplete(0);
            this.loading = false;
          });
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
        this.address.getEndpoint(Endpoints.PREPROCESSING_INPUT)
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.http
          .repeatedPostObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            'responseData.preprocessingResponse.predictivePerformance',
            this.address.getEndpoint(Endpoints.PREPROCESSING_RESOURCE_AVAIL),
            new HttpParams()
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
            this.stepperService.setStepComplete(1);
            this.loading = false;
          });
      });
  }

  submitWrapperConfig(config: WrapperConfig) {
    this.loading = true;
    const currentOfsData = this.ofsDataClone;

    currentOfsData.configData.wrapperConfig = config;
    this.ofsDataSubject$.next(currentOfsData);

    this.http
      .postObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        this.address.getEndpoint(Endpoints.WRAPPER_INPUT)
      )
      .subscribe((response: OFSData) => {
        this.ofsDataSubject$.next(response);
        this.http
          .repeatedPostObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            'responseData.wrapperResponse.featureSelection',
            this.address.getEndpoint(Endpoints.WRAPPER_RESOURCE_AVAIL),
            new HttpParams()
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
            this.loading = false;
          });
      });
  }

  submitClassifierConfig(config: ClassifierConfig) {
    this.loading = true;
    const currentOfsData = this.ofsDataClone;

    currentOfsData.configData.classifierConfig = config;
    this.ofsDataSubject$.next(currentOfsData);

    this.http
      .postObject<OFSData, OFSData>(
        this.ofsDataSubject$.value,
        this.address.getEndpoint(Endpoints.CLASSIFIER_INPUT),
        new HttpParams()
      )
      .subscribe((response) => {
        this.ofsDataSubject$.next(response);
        this.stepperService.setStepComplete(2);
        this.stepperService.setStep(3);
        this.http
          .repeatedPostObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            'responseData.classifierResponse.pcaImage',
            this.address.getEndpoint(Endpoints.CLASSIFIER_RESOURCES),
            new HttpParams()
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
            this.stepperService.setStepComplete(3);
            this.loading = false;
          });
      });
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

  getDownloadLink(): string | undefined {
    return this.ofsData?.responseData?.classifierResponse?.downloadLink;
  }
}
