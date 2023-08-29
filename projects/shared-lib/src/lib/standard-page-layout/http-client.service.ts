import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, partition } from 'rxjs';
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
      .post<T>(url, fd, {
        headers: new HttpHeaders({
          Authorization: this.authService.getUserAuthorization().toString(),
        }),
        params: fileList.httpParameters,
        reportProgress: true, // currently no way to track? (dialogid)
      });

  }

  postMultiPartFilesEvents(
    fileList: MultiFileUploadData,
    url: string
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
      .post(url, fd, {
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
    url: string
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
