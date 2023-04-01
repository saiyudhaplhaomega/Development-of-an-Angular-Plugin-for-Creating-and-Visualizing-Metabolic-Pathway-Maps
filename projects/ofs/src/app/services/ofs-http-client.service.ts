import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, of, repeat, take } from 'rxjs';
import { get } from 'lodash';
import { Endpoints, getAdress } from '../models/endpoints.model';
import { OfsJobState } from '../workflow/models/ofs-job.model';
import { MultiFileUploadData } from './http-client.service';
import { UploadProgressService } from './upload-progress.service';

@Injectable({
  providedIn: 'root',
})
export class OfsHttpClientService {
  constructor(
    private http: HttpClient,
    private uploadProgressService: UploadProgressService
  ) {}

  postObject<T1, T2>(
    obj: T1,
    api: Endpoints,
    params?: HttpParams
  ): Observable<T2> {
    return this.http.post<T2>(getAdress(api), obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: this.authGuard.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  getObject<T>(api: Endpoints, params?: HttpParams): Observable<T> {
    return this.http.get<T>(getAdress(api), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: this.authGuard.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  /**
   * repeated post requests to server
   * @param obj object thats posted
   * @param checkProperty if this property is available in the response, the request will resolve, else requests will be continued
   * @param api endpoint
   * @param params http params
   * @param delay interval between requests
   * @returns observable of the response object
   */
  repeatedPostObject<T1, T2>(
    obj: T1,
    checkProperty: string,
    api: Endpoints,
    params?: HttpParams,
    delay: number = 5_000
  ): Observable<T2> {
    return this.postObject<T1, T2>(obj, api, params).pipe(
      repeat({ delay: delay }),
      filter((res: T2) => get(res, checkProperty) !== undefined),
      take(1)
    );
  }

  postMultiPartFiles<T>(
    fileList: MultiFileUploadData,
    api: Endpoints
  ): Observable<T> {
    const fd = new FormData();
    let multipartids: string = '';
    fileList.files.forEach((file) => {
      multipartids += file.fileID + ';';
    });

    fd.set('Content-Type', 'multipart/form-data');
    fd.append('fileIDList', multipartids);
    fileList.files.map((file) => {
      fd.append(file.fileID, file.uploadFile);
    });
    return this.http.post<T>(getAdress(api), fd, {
      headers: new HttpHeaders({
        // Authorization: this.authGuard.getUserAuthorization().toString(),
      }),
      params: fileList.httpParameters,
      reportProgress: true, // currently no way to track? (dialogid)
    });
  }

  performUpload(
    dialogId: string,
    fileList: MultiFileUploadData,
    api: Endpoints
  ) {
    //TODO: handle big file-sizes -> split upload into multiple uploads
    fileList.files.map((fileUploadData) => {
      this.uploadProgressService.addToTotal(fileUploadData.uploadFile.size);
    });

    const fd = new FormData();
    let multipartids: string = '';
    fileList.files.forEach((file) => {
      multipartids += file.fileID + ';';
    });

    fd.set('Content-Type', 'multipart/form-data');
    fd.append('fileIDList', multipartids);
    fileList.files.map((file) => {
      fd.append(file.fileID, file.uploadFile);
    });

    this.http
      .post(getAdress(api), fd, {
        headers: new HttpHeaders({
          // Authorization: this.authGuard.getUserAuthorization().toString(),
        }),
        observe: 'events',
        params: fileList.httpParameters,
        reportProgress: true,
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressService.changeReportLoaded(event.loaded);
            //console.log(event);
          } else if (event.type === HttpEventType.Response) {
            //console.log(`File ${fileUploadData.uploadFile.name} uploaded`);
          }
        },
        error: (error) => {
          if (error.status >= 400) {
            // handle failed upload
            // if (this.dialog.getDialogById(dialogId)) {
            //   this.dialog
            //     .getDialogById(dialogId)
            //     .componentInstance.setUploadFailed();
            //   this.dialog.getDialogById(
            //     dialogId
            //   ).componentInstance.uploadFailedMessage = error.statusText;
            // }
          } else {
            throw error;
          }
        },
      });
  }

  // TODO: keep for demo
  // dummyHttpRequest(
  //   api: string,
  //   object: RequestObject,
  //   params?: HttpParams
  // ): Observable<RequestObject> {
  //   const responseObject = JSON.parse(JSON.stringify(object)) as RequestObject;
  //   responseObject.job = this.createDummyResponse(api);

  //   const responseData = responseObject.configData;

  //   console.log(responseObject);

  //   if (responseData?.hasOwnProperty('groups')) {
  //     responseObject.responsenData = {
  //       classDistribution: '../../../../assets/dummy-figures/pie.jpg',
  //       dataSparsity: '../../../../assets/dummy-figures/data_sparsity.jpg',
  //       testGroups: ['test1', 'test2'],
  //     };
  //   }

  //   if (responseData?.hasOwnProperty('controlGroup')) {
  //     responseObject.responsenData = {
  //       pvaluesMolecules:
  //         '../../../../assets/dummy-figures/p_values_molecules.jpg',
  //       predictivePerformance:
  //         '../../../../assets/dummy-figures/p_values_molecules_accuracy.jpg',
  //     };
  //   }

  //   if (
  //     responseData?.hasOwnProperty('repeats') &&
  //     !responseData?.hasOwnProperty('controlGroup')
  //   ) {
  //     responseObject.responsenData = {
  //       featureSelection:
  //         '../../../../assets/dummy-figures/individual_profile.jpg',
  //       featureSelectionProfiles:
  //         '../../../../assets/dummy-figures/mutual_profile.jpg',
  //     };
  //   }

  //   if (responseData?.hasOwnProperty('selectedFeatures')) {
  //     responseObject.responsenData = {
  //       pairwiseComparison:
  //         '../../../../assets/dummy-figures/molecules_pairwise.jpg',
  //       pca: '../../../../assets/dummy-figures/pca.jpg',
  //     };
  //   }

  //   console.log(responseObject);

  //   return of(responseObject).pipe(delay(5000));
  //   // once observable is completed, subscriptions automatically close
  //   // > also applys to http requests
  // }

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
