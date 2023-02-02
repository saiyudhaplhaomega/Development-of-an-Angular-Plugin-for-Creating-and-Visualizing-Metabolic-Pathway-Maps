import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config, delay, Observable, of } from 'rxjs';
import { ClassifierResponse } from '../models/classifier-response.model';
import { OverviewResponse } from '../models/overview-response.model';
import { PreprocessingResponse } from '../models/preprocessing-response.model';
import { WrapperResponse } from '../models/wrapper-response.model';
import { ClassifierConfig } from '../workflow/models/classifier.model';
import { OfsJobState, OfsJob } from '../workflow/models/ofs-job.model';
import { OverviewConfig } from '../workflow/models/overview.model';
import { PreprocessingConfig } from '../workflow/models/preprocessing.model';
import { WrapperConfig } from '../workflow/models/wrapper.model';

export interface RequestObject {
  job: OfsJob;
  configData:
    | OverviewConfig
    | PreprocessingConfig
    | WrapperConfig
    | ClassifierConfig;
  responsenData:
    | undefined
    | OverviewResponse
    | PreprocessingResponse
    | WrapperResponse
    | ClassifierResponse;
}

@Injectable({
  providedIn: 'root',
})
export class OfsHttpClientService {
  constructor(private http: HttpClient) {}

  dummyHttpRequest(
    api: string,
    object: RequestObject,
    params?: HttpParams
  ): Observable<RequestObject> {
    const responseObject = JSON.parse(JSON.stringify(object)) as RequestObject;
    responseObject.job = this.createDummyResponse(api);

    const responseData = responseObject.configData;

    console.log(responseObject);

    if (responseData?.hasOwnProperty('groups')) {
      responseObject.responsenData = {
        classDistribution: '../../../../assets/dummy-figures/pie.jpg',
        dataSparsity: '../../../../assets/dummy-figures/data_sparsity.jpg',
      };
    }

    if (responseData?.hasOwnProperty('controlGroup')) {
      responseObject.responsenData = {
        pvaluesMolecules:
          '../../../../assets/dummy-figures/p_values_molecules.jpg',
        predictivePerformance:
          '../../../../assets/dummy-figures/p_values_molecules_accuracy.jpg',
      };
    }

    if (
      responseData?.hasOwnProperty('repeats') &&
      !responseData?.hasOwnProperty('controlGroup')
    ) {
      responseObject.responsenData = {
        featureSelection:
          '../../../../assets/dummy-figures/individual_profile.jpg',
        featureSelectionProfiles:
          '../../../../assets/dummy-figures/mutual_profile.jpg',
      };
    }

    if (responseData?.hasOwnProperty('selectedFeatures')) {
      responseObject.responsenData = {
        pairwiseComparison:
          '../../../../assets/dummy-figures/molecules_pairwise.jpg',
        pca: '../../../../assets/dummy-figures/pca.jpg',
      };
    }

    console.log(responseObject);

    return of(responseObject).pipe(delay(5000));
    // once observable is completed, subscriptions automatically close
    // > also applys to http requests
  }

  createDummyResponse(api: string) {
    const job = { jobId: 'Käsekuchen', state: OfsJobState.NOJOB };

    switch (api) {
      case 'createjob/':
        job.state = OfsJobState.CREATED;
        break;
      case 'overviewinput/':
        job.state = OfsJobState.OVERVIEW_INPUT;
        break;
      case 'preprocessinginput/':
        job.state = OfsJobState.PREPROCESSING_INPUT;
        break;
      case 'wrapperinput/':
        job.state = OfsJobState.WRAPPER_INPUT;
        break;
      case 'classifierinput/':
        job.state = OfsJobState.RESULTS;
        break;
    }

    return job;
  }
}
