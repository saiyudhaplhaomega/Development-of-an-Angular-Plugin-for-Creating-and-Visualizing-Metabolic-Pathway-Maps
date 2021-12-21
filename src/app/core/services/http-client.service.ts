import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {WebserveraddressService} from './webserveraddress.service';
import {Observable} from 'rxjs';
import {AuthGuard} from 'src/app/core/services/auth-guard.service';
import {UploadProgressService} from './upload-progress.service';
import {MatDialog} from '@angular/material';

export interface FileUploadData {
  uploadFile: File;
  httpParameters: Record<string, any>;
  fileUploadAdress: string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  uploadFileArray: FileUploadData[];

  constructor(
    private http: HttpClient,
    private webserver: WebserveraddressService,
    private authGuard: AuthGuard,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog
    ) {
  }

  // postJsonObject<T>(obj: T, api: string): Observable<T> {
  //   httpOptions.headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': this.authGuard.getUserAuthorization().toString(),
  //   });
  //   return this.http.post<T>(this.webserver.getEndpoint(api), obj, httpOptions);
  // }

  postObject<T1, T2>(obj: T1, api: string, params?: HttpParams): Observable<T2> {
    return this.http.post<T2>(this.webserver.getEndpoint(api), obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authGuard.getUserAuthorization().toString()
      }),
      params: params
    });
  }

  getObject<T>(api: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.webserver.getEndpoint(api), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authGuard.getUserAuthorization().toString()
      }),
      params: params
    });
  }

  postFile(file: File, api: string, params?: HttpParams) {
    const fd = new FormData();
    fd.set('Content-Type', 'multipart/form-data');
    fd.append('uploaded_file', file);
    return this.http.post(this.webserver.getEndpoint(api), fd, {
      headers: new HttpHeaders({
        'Authorization': this.authGuard.getUserAuthorization().toString(),
      }),
      observe: 'events',
      params: params,
      reportProgress: true
    });
  }

  addUploadFiles(files: FileUploadData[]) {
    this.uploadFileArray.push(...files);
  }

  clearUploadFiles() {
    this.uploadFileArray = [];
  }

  performUpload(dialogId) {
    for (const fileUploadData of this.uploadFileArray) {
      this.uploadProgressService.addToTotal(fileUploadData.uploadFile.size);

      const params: HttpParams = new HttpParams({
        fromObject: fileUploadData.httpParameters
      });

      this.postFile(fileUploadData.uploadFile,
        this.webserver.getEndpoint(fileUploadData.fileUploadAdress), params).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressService.changeReportLoaded(event.loaded);
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log(`File ${fileUploadData.uploadFile.name} uploaded`);
          }
        },
        error => {
          if (error.status === 500) {
            // handle failed upload
            if (this.dialog.getDialogById(dialogId)) {
              this.dialog.getDialogById(dialogId).componentInstance.setUploadFailed();
              this.dialog.getDialogById(dialogId).componentInstance.data.message = error;
            }
          } else {
            throw error;
          }
        }
      );
    }
  }

}
