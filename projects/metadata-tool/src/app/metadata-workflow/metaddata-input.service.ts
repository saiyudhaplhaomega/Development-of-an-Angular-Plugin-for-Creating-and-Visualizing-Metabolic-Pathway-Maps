import { Injectable } from '@angular/core';
import { ColumnData, ColumnDataObject } from '../model/metadata-columnData';
import { HttpClientService, MultiFileUploadData, UploadProgressService } from 'shared-lib';
import {
  Endpoints,
  WebserveraddressService,
} from '../webserveraddress.service';
import { MetaDataUploadJson, MetaDataUploadJsonObject } from '../model/metadatauploadjson';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DownloadLinksJson } from '../model/download-json';

@Injectable({
  providedIn: 'root',
})
export class MetaDataInputService {

  dummyData: MetaDataUploadJson = {
    jobId: '',
    createInitialMetadataJobId: '',
    fileConversionJobId: '',
    processingFinished: false,
    dataFilesIDs: null,
    metadataJson: []
  }

  public metadataUploadJson = new BehaviorSubject<MetaDataUploadJson>(this.dummyData);

  constructor(
    private http: HttpClientService,
    private url: WebserveraddressService
  ) {}

  upload(files: MultiFileUploadData, uploadProgress: UploadProgressService, dialog: MatDialog): void {
    this.http
    .postMultiPartFilesEvents(files, this.url.getURL(Endpoints.UPLOAD_FILES))
    .subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          uploadProgress.changeReportLoaded(event.loaded);
          console.log('UploadProgress event');
          console.log(event);
        } else if (event.type === HttpEventType.Response) {
          console.log('Response event');
          console.log(event);
          console.log(event.body);
          const newMetadataJson: MetaDataUploadJson = event.body as MetaDataUploadJson;
          this.metadataUploadJson.next(newMetadataJson);
          console.log(this.metadataUploadJson);
          const params = new HttpParams(
            {
              fromObject: {
                jobid: newMetadataJson.createInitialMetadataJobId,
              }
            }
          );
          this.http.repeatedGetObject<MetaDataUploadJson>(
            'jobId',
            this.url.getURL(Endpoints.GET_INITIAL_METADATA),
            params,
            5,
          ).subscribe((response: MetaDataUploadJson) => {
            console.log("response repeat");
            console.log(response);
            this.metadataUploadJson.next(response);
          });
        } else {
          console.log('unknown event');
          console.log(event);
          console.log(event.type);
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status >= 400) {
          // handle failed upload
          if (dialog.getDialogById("UPLOAD")) {
            dialog.getDialogById("UPLOAD").componentInstance.setUploadFailed();
            dialog.getDialogById("UPLOAD").componentInstance.uploadFailedMessage = error.statusText;
          }
        } else {
          throw error;
        }
      },
    });
  }

  submiteTable(dataExport: ColumnData[]) {
    const uploadJson = this.metadataUploadJson.getValue();
    uploadJson.metadataJson = dataExport;
    this.metadataUploadJson.next(uploadJson);
    this.http.postObject<MetaDataUploadJson, MetaDataUploadJson>(this.metadataUploadJson.value, this.url.getURL(Endpoints.SUBMIT_METADATA))
      .subscribe((response) => {
        this.metadataUploadJson.next(response);
        this.http
          .repeatedPostObject<MetaDataUploadJson, DownloadLinksJson>(
            response,
            'jobID',
            this.url.getURL(Endpoints.GET_DOWNLOAD_LINKS),
            new HttpParams()
          )
          .subscribe((response: DownloadLinksJson) => {
              // SAVE DOwnload link jsn
          });

      });

    }
}
