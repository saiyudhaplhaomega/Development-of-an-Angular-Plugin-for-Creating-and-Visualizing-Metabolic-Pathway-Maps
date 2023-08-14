import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { WebserveraddressService } from './webserveraddress.service';
import { Observable, partition } from 'rxjs';
import { AuthGuard } from 'dist/shared-lib';
import { UploadProgressService } from './upload-progress.service';
import { MatDialog } from '@angular/material/dialog';
import { Endpoints } from '../../core/services/webserveraddress.service';
import { AuthService } from 'dist/shared-lib';

export interface FileUploadData {
  uploadFile: File;
  httpParameters: HttpParams;
  fileUploadAdress?: string;
}

export interface MultiFileUploadData {
  files: UploadFile[];
  fileUploadAdress: string;
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
    private webserver: WebserveraddressService,
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

  postObject<T1, T2>(
    obj: T1,
    api: string,
    params?: HttpParams
  ): Observable<T2> {
    return this.http.post<T2>(this.webserver.getEndpoint(api), obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  getObject<T>(api: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.webserver.getEndpoint(api), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getUserAuthorization().toString(),
      }),
      params: params,
    });
  }

  postFile(file: File, api: string, params?: HttpParams) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    this.webserver.getEndpoint(api);
    return this.http.post(this.webserver.getEndpoint(api), fd, {
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
    return this.http
      .post<T>(this.webserver.getEndpoint(api), fd, {
        headers: new HttpHeaders({
          Authorization: this.authService.getUserAuthorization().toString(),
        }),
        params: fileList.httpParameters,
        reportProgress: true, // currently no way to track? (dialogid)
      });

  }

  postMultiPartFilesEvents(
    fileList: MultiFileUploadData,
    api: Endpoints
  ): Observable<HttpEvent<Object>> {
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
    console.log('return http');
    return this.http
      .post(this.webserver.getEndpoint(api), fd, {
        headers: new HttpHeaders({
          Authorization: this.authService.getUserAuthorization().toString(),
        }),
        observe: 'events',
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
      // TODO: this is how we would do chunking: (roughly)
      // let i = 0
      // let part: Blob;
      // do {
      //     part = fileUploadData.uploadFile.slice(i, (i+1)*1024*1024*100-1)
      //     i++;
      // } while (part.size != 0);
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
      .post(this.webserver.getEndpoint(api), fd, {
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
