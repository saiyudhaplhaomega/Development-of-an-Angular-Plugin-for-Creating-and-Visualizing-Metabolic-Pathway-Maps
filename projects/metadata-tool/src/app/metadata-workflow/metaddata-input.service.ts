import { Injectable } from '@angular/core';
import { ColumnData } from '../model/metadata-columnData';
import { HttpClientService, MultiFileUploadData, UploadProgressService } from 'shared-lib';
import {
  Endpoints,
  WebserveraddressService,
} from '../webserveraddress.service';
import { MetaDataUploadJson } from '../model/metadatauploadjson';
import { HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MetaDataInputService {

  metadataUploadJson: BehaviorSubject<MetaDataUploadJson>;

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
          this.metadataUploadJson.next(JSON.parse(event.body.toString()));
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

  submiteTable() {
    //this.http.postObject<MetadaDataUploadJson, DownloadLinksJson>().subscribe() {};
  }

  getColumnData(): Promise<ColumnData[]> {
    // if (this.metadataUploadJson != null) {
    //   return this.metadataUploadJson.metadataJson;
    // } else {
      return this.getDummyData();
    // }
  }

  getDummyData(): Promise<ColumnData[]> {
    return Promise.resolve([
      {
        Counter: 1,
        Sourcename: 'biogas sample',
        spectrumFile: 'sample1.mgf',
        psmFile: 'sample1.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        Study: '',
        Project: '',
        Program: '',
        BiologicalReplicate: 1,
        Metagenomes: 'ecological metagenome',
        EcologicalMetagenomes: 'biogas metagenom',
        AnalyticalFraction: '',
        TemperatureCondtions: '',
        Pressure: '',
        pH: '',
        CarbonSource: '',
        ElectronSource: '',
        CountIdentifiedSpezies: '',
        AssayName: 'Assay 1',
        ExperimentType: 'heat shock',
        TechnologyType: '',
        TechnicalReplicate: 1,
        Label: 'label 1',
        FractionIdentifier: 1,
        CleavantAgentDetails: '',
        Instrument: '',
        ModificationParameters: '',
        ModificationParameters1: '',
        ModificationParameters2: '',
        DissociationMethod: '',
        PrecursorMassTolerance: '',
        FragmentMassTolerance: '',
        DataFile: 'datafile path 1',
        FileUri: 'file uri 1',
        mzID: 'mzID 1',
        mzML: 'mzML 1',
        Comment: '',
        FactorValue: 'heat shock',
        fileType: 'mgf'
      },

      {
        Counter: 2,
        Sourcename: 'biogas sample',
        spectrumFile: 'sample2.mgf',
        psmFile: 'sample2.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        Study: '',
        Project: '',
        Program: '',
        BiologicalReplicate: 2,
        Metagenomes: 'ecological metagenome',
        EcologicalMetagenomes: 'biogas metagenom',
        AnalyticalFraction: '',
        TemperatureCondtions: '',
        Pressure: '',
        pH: '',
        CarbonSource: '',
        ElectronSource: '',
        CountIdentifiedSpezies: '',
        AssayName: 'Assay 1',
        ExperimentType: 'heat shock',
        TechnologyType: '',
        TechnicalReplicate: 2,
        Label: 'label 1',
        FractionIdentifier: 1,
        CleavantAgentDetails: '',
        Instrument: '',
        ModificationParameters: '',
        ModificationParameters1: '',
        ModificationParameters2: '',
        DissociationMethod: '',
        PrecursorMassTolerance: '',
        FragmentMassTolerance: '',
        DataFile: 'datafile path 2',
        FileUri: 'file uri 2',
        mzID: 'mzID 2',
        mzML: 'mzML 2',
        Comment: '',
        FactorValue: 'heat shock',
        fileType: 'mgf'
      },

      {
        Counter: 3,
        Sourcename: 'biogas sample',
        spectrumFile: 'sample3.mgf',
        psmFile: 'sample3.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        Study: '',
        Project: '',
        Program: '',
        BiologicalReplicate: 3,
        Metagenomes: 'ecological metagenome',
        EcologicalMetagenomes: 'biogas metagenom',
        AnalyticalFraction: '',
        TemperatureCondtions: '',
        Pressure: '',
        pH: '',
        CarbonSource: '',
        ElectronSource: '',
        CountIdentifiedSpezies: '',
        AssayName: 'Assay 1',
        ExperimentType: 'heat shock',
        TechnologyType: '',
        TechnicalReplicate: 3,
        Label: 'label 1',
        FractionIdentifier: 1,
        CleavantAgentDetails: '',
        Instrument: '',
        ModificationParameters: '',
        ModificationParameters1: '',
        ModificationParameters2: '',
        DissociationMethod: '',
        PrecursorMassTolerance: '',
        FragmentMassTolerance: '',
        DataFile: 'datafile path 3',
        FileUri: 'file uri 3',
        mzID: 'mzID 3',
        mzML: 'mzML 3',
        Comment: '',
        FactorValue: 'heat shock',
        fileType: 'mgf'
      },

      {
        Counter: 4,
        Sourcename: 'biogas sample',
        spectrumFile: 'sample4.mgf',
        psmFile: 'sample4.csv',
        ProjectIdentifier: 'ISAS_SDRF',
        Study: '',
        Project: '',
        Program: '',
        BiologicalReplicate: 4,
        Metagenomes: 'ecological metagenome',
        EcologicalMetagenomes: 'biogas metagenom',
        AnalyticalFraction: '',
        TemperatureCondtions: '',
        Pressure: '',
        pH: '',
        CarbonSource: '',
        ElectronSource: '',
        CountIdentifiedSpezies: '',
        AssayName: 'Assay 1',
        ExperimentType: 'heat shock',
        TechnologyType: '',
        TechnicalReplicate: 1,
        Label: 'label 1',
        FractionIdentifier: 1,
        CleavantAgentDetails: '',
        Instrument: '',
        ModificationParameters: '',
        ModificationParameters1: '',
        ModificationParameters2: '',
        DissociationMethod: '',
        PrecursorMassTolerance: '',
        FragmentMassTolerance: '',
        DataFile: 'datafile path 4',
        FileUri: 'file uri 4',
        mzID: 'mzID 4',
        mzML: 'mzML 4',
        Comment: '',
        FactorValue: 'heat shock',
        fileType: 'mgf'
      },
    ]);
  }
}
