import { Injectable } from "@angular/core";
import { MetadataJson, MetadataJsonObject } from "../model/metadata-columnData";
import {
  HttpClientService,
  MultiFileUploadData,
  UploadProgressService
} from "shared-lib";
import {
  Endpoints,
  WebserveraddressService
} from "../webserveraddress.service";
import {
  MetaDataUploadJson,
  MetaDataUploadJsonObject
} from "../model/metadatauploadjson";
import { HttpEventType, HttpParams } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { DownloadLinksJson } from "../model/download-json";
import { dummyData as data } from "./dummy-data";

@Injectable({
  providedIn: "root"
})
export class MetaDataService {

  dummyData: MetaDataUploadJson = data; // TODO: for testing purposes, remove later
  downloadUrls: string[] = [];


  public metadataUploadJson = new BehaviorSubject<MetaDataUploadJson>(
    this.dummyData
  );

  constructor(
    private http: HttpClientService,
    private url: WebserveraddressService
  ) {}

  getDownloads(): string[] {

    return
  }

  updateAllMetaDataUploadJson(newMetadata: { [key: string]: any }): void {
    console.log(
      "🚀 ~ file: metaddata-input.service.ts:38 ~ MetaDataService ~ updateAllMetaDataUploadJson ~ newMetadata:",
      newMetadata
    );
    try {
      const currentMetaData = this.metadataUploadJson.value;
      console.log(
        "🚀 ~ file: metaddata-input.service.ts:40 ~ MetaDataService ~ updateAllMetaDataUploadJson ~ currentMetaData:",
        currentMetaData
      );

      // Update metadataJson with the processingPipeline value from the model
      const updatedMetadataJson = currentMetaData.metadataJson.map((data) => {
        return { ...data, processingPipeline: newMetadata.processingPipeline };
      });

      // Update the metadataUploadJson with the new metadataJson array
      this.metadataUploadJson.next({
        ...currentMetaData,
        metadataJson: updatedMetadataJson
      });
      console.log(
        "🚀 ~ file: metaddata-input.service.ts:59 ~ MetaDataService ~ updateAllMetaDataUploadJson ~ this.metadataUploadJson:",
        this.metadataUploadJson.value
      );
    } catch (error) {
      console.error("An error occurred while updating metadata:", error);
      // Further error handling can be added here
    }
  }

  upload(
    files: MultiFileUploadData,
    uploadProgress: UploadProgressService,
    dialog: MatDialog
  ): void {
    this.http
      .postMultiPartFilesEvents(files, this.url.getURL(Endpoints.UPLOAD_FILES))
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            uploadProgress.changeReportLoaded(event.loaded);
            console.log("UploadProgress event");
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log("Response event");
            console.log(event);
            console.log(event.body);
            const newMetadataJson: MetaDataUploadJson =
              event.body as MetaDataUploadJson;
            // const copy: MetadataJsonObject = event.body as MetadataJsonObject;
            console.log("map or no");
            newMetadataJson.metadataJson.forEach( (col) => {
              console.log(col.ontId2Param instanceof Map);
              const ontId2Param = new Map<string, string>();
              for (const key in col.ontId2Param) {
                ontId2Param[key] = col.ontId2Param[key];
              }
              col.ontId2Param = ontId2Param;
              const ontId2Enabled = new Map<string, boolean>();
              for (const key in col.ontId2Enabled) {
                ontId2Enabled[key] = col.ontId2Enabled[key];
              }
              col.ontId2Enabled = ontId2Enabled;
              console.log(col.ontId2Param instanceof Map);
            });

            // newMetadataJson.metadataJson.forEach( (col) => {
            //   const ontId2Param = new Map<string, string>();
            //   const ontId2Enabled = new Map<string, boolean>();
            //   for (prop : col.)
            // });



            this.metadataUploadJson.next(newMetadataJson);
            console.log(this.metadataUploadJson);
            const params = new HttpParams({
              fromObject: {
                jobid: newMetadataJson.createInitialMetadataJobId
              }
            });
            this.http
              .repeatedGetObject<MetaDataUploadJson>(
                "jobId",
                this.url.getURL(Endpoints.GET_INITIAL_METADATA),
                params,
                2000
              )
              .subscribe((response: MetaDataUploadJson) => {
                console.log("response repeat");
                console.log(response);
                this.metadataUploadJson.next(response);
              });
          } else {
            console.log("unknown event");
            console.log(event);
            console.log(event.type);
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status >= 400) {
            // handle failed upload
            if (dialog.getDialogById("UPLOAD")) {
              dialog
                .getDialogById("UPLOAD")
                .componentInstance.setUploadFailed();
              dialog.getDialogById(
                "UPLOAD"
              ).componentInstance.uploadFailedMessage = error.statusText;
            }
          } else {
            throw error;
          }
        }
      });
  }

  submiteTable(dataExport: MetadataJson[]) {
    const uploadJson = this.metadataUploadJson.getValue();
    uploadJson.metadataJson = dataExport;
    this.metadataUploadJson.next(uploadJson);
    this.http
      .postObject<MetaDataUploadJson, MetaDataUploadJson>(
        this.metadataUploadJson.value,
        this.url.getURL(Endpoints.SUBMIT_METADATA)
      )
      .subscribe((response) => {
        this.metadataUploadJson.next(response);
        this.http
          .repeatedPostObject<MetaDataUploadJson, DownloadLinksJson>(
            response,
            "jobID",
            this.url.getURL(Endpoints.GET_DOWNLOAD_LINKS),
            new HttpParams()
          )
          .subscribe((response: DownloadLinksJson) => {
            response.mzmlFileDownloads.forEach( (url) => {
              this.downloadUrls.push(url);
            });
            response.mzidFileDownloads.forEach( (url) => {
              this.downloadUrls.push(url);
            });
            this.downloadUrls.push(response.sdrfFileDownload);
          });
      });
  }
}
