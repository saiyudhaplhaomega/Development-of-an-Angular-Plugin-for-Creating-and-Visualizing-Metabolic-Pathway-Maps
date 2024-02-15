import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MultiFileUploadData } from 'shared-lib';
import { ClassifierConfig } from '../models/classifier.model';
import { OFSData } from '../models/ofs-data.model';
import { OverviewConfig } from '../models/overview.model';
import { PreprocessingConfig } from '../models/preprocessing.model';
import { WrapperConfig } from '../models/wrapper.model';
import { dummyConfig } from 'projects/ofs/src/assets/dummy-config';
import { HttpClientService } from 'shared-lib';
import {
  WebserveraddressService,
  Endpoints,
} from '../../../services/offwebserveraddress.service';

export interface SimpleMessage {
  message: string;
}

/**
 * Service for handling workflow related data
 * - store formdata from input form
 * - send form data to server
 * - handle accessible routes
 */
@Injectable({ providedIn: 'any' })
export class WorkflowService {
  loading: Boolean;

  ofsDataSubject$ = new BehaviorSubject<OFSData>(undefined);

  constructor(
    private http: HttpClientService,
    private address: WebserveraddressService
  ) {
    this.ofsDataSubject$.next(new OFSData());
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
    // this.setCompletedSteps(existingConfig);
    this.ofsDataSubject$.next(existingConfig);
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
          uploadFile: config.data as File,
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
            ['responseData', 'overviewResponse', 'dataSparsity'],
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
            ['responseData', 'preprocessingResponse', 'predictivePerformance'],
            this.address.getEndpoint(Endpoints.PREPROCESSING_RESOURCE_AVAIL),
            new HttpParams()
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
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
            ['responseData', 'wrapperResponse', 'featureSelection'],
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
        this.http
          .repeatedPostObject<OFSData, OFSData>(
            this.ofsDataSubject$.value,
            ['responseData', 'classifierResponse', 'pcaImage'],
            this.address.getEndpoint(Endpoints.CLASSIFIER_RESOURCES),
            new HttpParams()
          )
          .subscribe((response: OFSData) => {
            this.ofsDataSubject$.next(response);
            this.loading = false;
            console.log(response);
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
}
