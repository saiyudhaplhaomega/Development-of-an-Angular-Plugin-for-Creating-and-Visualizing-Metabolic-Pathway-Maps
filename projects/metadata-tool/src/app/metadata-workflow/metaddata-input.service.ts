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
    metadataJson: [{
        sourcename: 'biogas sample',
        spectrumFile: 'sample1.mgf',
        psmFile: 'sample1.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        project: '',
        study: '',
        program: '',
        biologicalReplicate: 1,
        metagenomes: 'ecological metagenome',
        ecologicalMetagenomes: 'biogas metagenom',
        analyticalFraction: '',
        temperatureCondtions: '',
        pressure: '',
        pH: '',
        carbonSource: '',
        electronSource: '',
        countIdentifiedSpezies: '',
        assayName: 'Assay 1',
        experimentType: 'heat shock',
        technologyType: '',
        technicalReplicate: 1,
        label: 'label 1',
        fractionIdentifier: 1,
        cleavantAgentDetails: '',
        instrument: '',
        modificationParameters: '',
        modificationParameters1: '',
        modificationParameters2: '',
        dissociationMethod: '',
        precursorMassTolerance: '',
        fragmentMassTolerance: '',
        dataFile: 'datafile path 1',
        fileUri: 'file uri 1',
        mzID: 'mzID 1',
        mzML: 'mzML 1',
        comment: '',
        factorValue: 'heat shock',
        fileType: 'mgf'
      },
      {
        sourcename: 'biogas sample',
        spectrumFile: 'sample1.mgf',
        psmFile: 'sample1.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        project: '',
        study: '',
        program: '',
        biologicalReplicate: 1,
        metagenomes: 'ecological metagenome',
        ecologicalMetagenomes: 'biogas metagenom',
        analyticalFraction: '',
        temperatureCondtions: '',
        pressure: '',
        pH: '',
        carbonSource: '',
        electronSource: '',
        countIdentifiedSpezies: '',
        assayName: 'Assay 1',
        experimentType: 'heat shock',
        technologyType: '',
        technicalReplicate: 1,
        label: 'label 1',
        fractionIdentifier: 1,
        cleavantAgentDetails: '',
        instrument: '',
        modificationParameters: '',
        modificationParameters1: '',
        modificationParameters2: '',
        dissociationMethod: '',
        precursorMassTolerance: '',
        fragmentMassTolerance: '',
        dataFile: 'datafile path 1',
        fileUri: 'file uri 1',
        mzID: 'mzID 1',
        mzML: 'mzML 1',
        comment: '',
        factorValue: 'heat shock',
        fileType: 'mgf'
      },
      {
        sourcename: 'biogas sample',
        spectrumFile: 'sample1.mgf',
        psmFile: 'sample1.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        project: '',
        study: '',
        program: '',
        biologicalReplicate: 1,
        metagenomes: 'ecological metagenome',
        ecologicalMetagenomes: 'biogas metagenom',
        analyticalFraction: '',
        temperatureCondtions: '',
        pressure: '',
        pH: '',
        carbonSource: '',
        electronSource: '',
        countIdentifiedSpezies: '',
        assayName: 'Assay 1',
        experimentType: 'heat shock',
        technologyType: '',
        technicalReplicate: 1,
        label: 'label 1',
        fractionIdentifier: 1,
        cleavantAgentDetails: '',
        instrument: '',
        modificationParameters: '',
        modificationParameters1: '',
        modificationParameters2: '',
        dissociationMethod: '',
        precursorMassTolerance: '',
        fragmentMassTolerance: '',
        dataFile: 'datafile path 1',
        fileUri: 'file uri 1',
        mzID: 'mzID 1',
        mzML: 'mzML 1',
        comment: '',
        factorValue: 'heat shock',
        fileType: 'mgf'
      },
    ]
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

  submiteTable(data: ColumnData[]) {
    const uploadJson = this.metadataUploadJson.getValue();
    uploadJson.metadataJson = data;
    this.metadataUploadJson.next(uploadJson);
    this.http.postObject<MetaDataUploadJson, DownloadLinksJson>(this.metadataUploadJson.value, this.url.getURL(Endpoints.SUBMIT_METADATA))
      .subscribe((response) => {
        this.http
          .repeatedPostObject<MetaDataUploadJson, DownloadLinksJson>(
            this.metadataUploadJson.value,
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
