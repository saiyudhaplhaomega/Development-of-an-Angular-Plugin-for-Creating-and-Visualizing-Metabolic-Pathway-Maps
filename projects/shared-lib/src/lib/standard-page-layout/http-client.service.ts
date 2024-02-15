import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, filter, repeat, take, tap } from 'rxjs';
import { UploadProgressService } from './upload-progress.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './login/auth.service';

export interface Endpoints {}

export interface FileUploadData {
  uploadFile: File;
  httpParameters: HttpParams;
}

export interface MultiFileUploadData {
  files: UploadFile[];
  httpParameters?: HttpParams;
}

export interface UploadFile {
  uploadFile: File;
  // TODO: this is pointless?
  fileID: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  //uploadFileArray: FileUploadData[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog
  ) {}

  // postJsonObject<T>(obj: T, api: string): Observable<T> {
  //   httpOptions.headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authGuard.getUserAuthorization().toString(),
  //   });
  //   return this.http.post<T>(this.webserver.getEndpoint(api), obj, httpOptions);
  // }

  /**
   * Checks if a (nested) property exists in an object
   *
   * @param {any} obj - object that is checked
   * @param {string} keys - an array of properties that are checked on each level of the nested object
   * @returns {any | undefined} - undefined if the property does not exist, else the property
   */
  getProperty(obj: any, keys: string[]) {
    let property = obj;
    for (let key in keys) {
      property = property[keys[key]];
    }
    return property;
  }

  postObject<T1, T2>(
    obj: T1,
    url: string,
    params?: HttpParams
  ): Observable<T2> {
    return this.http.post<T2>(url, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  getObject<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  repeatedGetObject<T>(
    checkProperty: string[],
    api: string,
    params?: HttpParams,
    delay = 5_000
  ): Observable<T> {
    return this.getObject<T>(api, params).pipe(
      repeat({ delay: delay }),
      filter((res: T) => this.getProperty(res, checkProperty) !== undefined),
      take(1)
    );
  }

  postFile(file: File, url: string, params?: HttpParams) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(url, fd, {
      headers: new HttpHeaders({
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      observe: 'events',
      params: params,
      reportProgress: true,
    });
  }

  postMultiPartFiles<T>(
    fileList: MultiFileUploadData,
    url: string
  ): Observable<T> {
    const fd = new FormData();
    let multipartids = '';
    fileList.files.forEach((file) => {
      multipartids += file.fileID + ';';
    });

    fd.set('Content-Type', 'multipart/form-data');
    fd.append('fileIDList', multipartids);
    fileList.files.map((file) => {
      fd.append(file.fileID, file.uploadFile);
    });
    return this.http.post<T>(url, fd, {
      headers: new HttpHeaders({
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      params: fileList.httpParameters,
      reportProgress: true, // currently no way to track? (dialogid)
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
    checkProperty: string[],
    api: string,
    params?: HttpParams,
    delay = 5_000
  ): Observable<T2> {
    return this.postObject<T1, T2>(obj, api, params).pipe(
      repeat({ delay: delay }),
      filter((res: T2) => this.getProperty(res, checkProperty) !== undefined),
      take(1)
    );
  }

  postMultiPartFilesEvents(
    fileList: MultiFileUploadData,
    url: string
  ): Observable<HttpEvent<Object>> {
    const fd = new FormData();
    let multipartids = '';
    fileList.files.forEach((file) => {
      multipartids += file.fileID + ';';
    });

    fd.set('Content-Type', 'multipart/form-data');
    fd.append('fileIDList', multipartids);
    fileList.files.map((file) => {
      fd.append(file.fileID, file.uploadFile);
    });
    return this.http.post(url, fd, {
      headers: new HttpHeaders({
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      observe: 'events',
      params: fileList.httpParameters,
      reportProgress: true, // currently no way to track? (dialogid)
    });
  }

  performUpload(dialogId: string, fileList: MultiFileUploadData, url: string) {
    //TODO: handle big file-sizes -> split upload into multiple uploads
    fileList.files.map((fileUploadData) => {
      this.uploadProgressService.addToTotal(fileUploadData.uploadFile.size);
      // TODO: this is how we would do chunking: (roughly)
      // let i = 0
      // let part: Blob;
      // do {
      //     part = fileUploadData.uploadFile.slice(i, (i+1)*1024*1024*100-1)
      //     i++;
      // } while (part.size != 0);
    });

    const fd = new FormData();
    let multipartids = '';
    fileList.files.forEach((file) => {
      multipartids += file.fileID + ';';
    });

    fd.set('Content-Type', 'multipart/form-data');
    fd.append('fileIDList', multipartids);
    fileList.files.map((file) => {
      fd.append(file.fileID, file.uploadFile);
    });

    this.http
      .post(url, fd, {
        headers: new HttpHeaders({
          Authorization: this.authService.getUserAuthorization().toString(),
        }),
        observe: 'events',
        params: fileList.httpParameters,
        reportProgress: true,
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressService.changeReportLoaded(event.loaded);
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log('File uploaded');
          }
        },
        error: (error) => {
          if (error.status >= 400) {
            // handle failed upload
            if (this.dialog.getDialogById(dialogId)) {
              this.dialog
                .getDialogById(dialogId)
                .componentInstance.setUploadFailed();
              this.dialog.getDialogById(
                dialogId
              ).componentInstance.uploadFailedMessage = error.statusText;
            }
          } else {
            throw error;
          }
        },
      });
  }
}
