import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService2} from '../data-navigation-tree/services/data2.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploadData, HttpClientService} from '../../../core/services/http-client.service';
import {GroupingOptions, ProteinGroupObject} from '../../objects/tableobjects';
import {MatDialog} from '@angular/material/dialog';
import {TextfieldDialogComponent} from '../../../core/components/textfield-dialog/textfield-dialog.component';
import {ExperimentJSONObject} from '../../objects/experimentjson';
import {UploadDialogComponent} from '../../../core/components/dialog/upload-dialog.component';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {Endpoints} from '../../../core/services/webserveraddress.service';
import {MPAFile} from '../../../prophane/objects/mpafile';
import {HttpParams} from '@angular/common/http';
import {UploadFileTypes, UploadFileTypeToEndpoints} from '../../objects/experimentUploadFile';
import {Observable} from 'rxjs';
import {createProteinGroupData} from '../../services/dummyProteinData';
import {MpaTableDataService} from '../../services/mpa-table-data.service';
import {ContentComponent} from '../../mpa.component';

interface Datstats {
  totalNoProteinGroups: number;
  totalNoProteins: number;
  totalNoPeptides: number;
  totalNoPsms: number;
  totalNoSpectra: number;
}

export interface ProteinGroupRequest {
  filename: string;
  experimentID: string;
}

@Component({
  selector: 'app-experiment-page', templateUrl: './experiment-page.component.html', styleUrls: ['./experiment-page.component.css'],
})

export class ExperimentPageComponent implements OnInit, OnDestroy, ContentComponent {

  dataItemOfThisComponent: DataItem;

  dbExperiment = new ExperimentJSONObject();
  description: string;
  creationDate: string;
  realUUID: string;

  // available upload options
  dataUploadSelection = 'Peaklist';
  dataUploadOptions: string[] = ['Peaklist', 'Search Result', 'Peaklist + Search Result'];

  displayNameEditing: string;

  proteinDatabases: DataItem[] = [];
  proteinDBselection = null;

  // files selected via input field
  selectedPeaklistFile: File;
  selectedSearchFile: File;
  selectedFasta: File;

  // child node elements
  peaklistFileNode: DataItem;
  searchFileNode: DataItem;

  // button disabling, etc.
  hasPeaklistFile: boolean;
  hasSearchFile: boolean;

  // to handle displayed options upon File selection
  fastaFileSelected = true;

  peaklistSelection = UploadFileTypes.MZML;
  searchFileSelection = UploadFileTypes.MZIDENT;

  // available options
  uploadFileTypePeaklist: string[] = [UploadFileTypes.MZML, UploadFileTypes.MGF];
  uploadFileTypeSearch: string[] = [UploadFileTypes.MZIDENT, UploadFileTypes.MASCOT_DAT];

  buttonDisabled = true;

  hasMpaData = false;
  datStats: Datstats;

  // private _dataMap: Map<string, DataItem>;
  // private children: string[];

  uploadDialogId = 'uploadDialog';

  constructor(private _snackBar: MatSnackBar, private dataService: DataService2, private uploaderService: HttpClientService, private uploadProgressService: UploadProgressService, private dialog: MatDialog, private mpaTableDataService: MpaTableDataService) {
  }

  ngOnInit() {
    // this.dataService.dataMap.subscribe(items => {
    //   // TODO: this._dataMap = items;
    // });

    // this.parentUuid = this._dataMap.get(this.id).parent;

    // this.realUUID = this._dataMap.get(this.id).uuid;

    this.creationDate = this.dataItemOfThisComponent.creation_date;
    this.description = this.dataItemOfThisComponent.description;
    this.displayNameEditing = this.dataItemOfThisComponent.displayName;

    this.proteinDatabases = this.dataService.getProteinDatabases();
    this.proteinDBselection = this.proteinDatabases[0];

    // this.getChildNodes();

    // this.children = this._dataMap.get(this.uuid).children;
    //
    // this.children.map(child => {
    //   if (this._dataMap.get(child).type === 'searchresult') {
    //     this.hasSearchFile = true;
    //     this.searchFileNode = this._dataMap.get(child);
    //   } else if (this._dataMap.get(child).type === 'peaklist') {
    //     this.hasPeaklistFile = true;
    //     this.peaklistFileNode = this._dataMap.get(child);
    //   }
    // });

    this.mpaTableDataService.mpaTableData.subscribe(mpaData => {
      this.hasMpaData = mpaData.length > 0;
      if (mpaData.length > 0) {
        this.datStats = this.calculateDataStats(mpaData);
      }
    });

    // get protein lists from server
    this.uploaderService.postObject<ProteinGroupRequest, ProteinGroupObject[]>({
      filename: 'sample.mgf', experimentID: this.dataItemOfThisComponent.uuid
      // TODO: deprecated: error
    }, Endpoints.GET_PROTEIN_GROUPS).subscribe(data => {
      this.mpaTableDataService.setMpaData(data);
    }, err => {
      // TODO: THIS IS THE DUMMY DATA:
      const proteinGroups = createProteinGroupData(this.realUUID, GroupingOptions.OCCAM, {
        numberOfMainGroups: 100, subGroupsPerMainGroup: 2
      });
      this.mpaTableDataService.setMpaData(proteinGroups);
    });


  }

// const protein_groups = [];
// for (let i = 1; i <= 100; i++) {
//   protein_groups.push(createNewProteinGroup(this.uuid));
// }
// this.mpaTableDataService.mpaData = protein_groups;

//TODO: REPLACE REFERENCES TO EXPID WITH ID ???? --> this.dbExperiment.expid = this.id;

// this.uploaderService.postObject<ExperimentJSONObject, ExperimentJSONObject>(
//   this.dbExperiment, Endpoints.UNIMPLEMENTED).subscribe(result => {
//   if (result != null) {
//     console.log(result);
//     this.dbExperiment = result;
//     // value = result;
//   }
// });


  ngOnDestroy() {
    //this.updateExperiment();
  }

  onProteinDBChange(item: DataItem) {
    console.log(this.proteinDBselection.displayName);
  }

  onUploadSelectionChange(option: string) {
    /**
     * handles change of the upload type selection (peaklist, search file, peaklist + search file)
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected = this.searchFileSelection !== UploadFileTypes.MASCOT_DAT;
    this.dataUploadSelection = option;
    this.disableButton();
  }

  onFileTypeSelectionChange() {
    /**
     * handles change of upload data type
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected = this.searchFileSelection !== UploadFileTypes.MASCOT_DAT;
    this.disableButton();
  }

// functions to handle selection of upload files
  onPeaklistFileChange(files: FileList) {
    this.selectedPeaklistFile = files[0];
    this.disableButton();
  }

  onSearchFileChange(files: FileList) {
    this.selectedSearchFile = files[0];
    this.disableButton();
  }

  onFastaFileChange(files: FileList) {
    this.selectedFasta = files[0];
    this.fastaFileSelected = true;
    this.disableButton();
  }

  disableButton() {
    /**
     * checks if files are selected or uploaded already and disables the submit button
     */
    if (this.dataUploadSelection === 'Peaklist + Search Result') {
      this.buttonDisabled = this.hasSearchFile || this.hasPeaklistFile || !this.selectedPeaklistFile || !this.selectedSearchFile || !this.fastaFileSelected;
    } else if (this.dataUploadSelection === 'Peaklist') {
      this.buttonDisabled = this.hasPeaklistFile || !this.proteinDBselection || !this.selectedPeaklistFile;
    } else if (this.dataUploadSelection === 'Search Result') {
      this.buttonDisabled = this.hasSearchFile || !this.selectedSearchFile || !this.fastaFileSelected;
    }
  }

  async onSubmit() {
    this.uploadProgressService.reset();
    this.uploaderService.clearUploadFiles();
    const onDialogClosingObservable = this.invokeUploadDialog();

    switch (this.dataUploadSelection) {
      case 'Peaklist':
        await this.addFileToUploadData(this.selectedPeaklistFile, this.peaklistSelection, this.dbExperiment.expid);

        this.hasPeaklistFile = true;
        break;

      case 'Search Result':
        await this.addFileToUploadData(this.selectedSearchFile, this.searchFileSelection, this.dataItemOfThisComponent.uuid);

        if (this.selectedFasta) {
          await this.addFileToUploadData(this.selectedFasta, UploadFileTypes.MASCOT_FASTA, this.dataItemOfThisComponent.uuid);
        }

        this.hasSearchFile = true;
        break;

      case 'Peaklist + Search Result':
        await this.addFileToUploadData(this.selectedPeaklistFile, this.peaklistSelection, this.dbExperiment.expid);
        this.hasPeaklistFile = true;

        await this.addFileToUploadData(this.selectedSearchFile, this.searchFileSelection, this.dbExperiment.expid);
        this.hasSearchFile = true;

        if (this.selectedFasta) {
          await this.addFileToUploadData(this.selectedFasta, UploadFileTypes.MASCOT_FASTA, this.dbExperiment.expid);
        }
        break;
    }

    this.uploaderService.performUpload(this.uploadDialogId);

    // invoked if upload dialog is closed
    onDialogClosingObservable.subscribe((uploadFailed) => {
      if (!uploadFailed) {
        if (this.selectedPeaklistFile) {
          //TODO: this.dataService.addNodeObj(this.dbExperiment.expid, this.selectedPeaklistFile.name, NodeType.PeakList, null);
        }
        if (this.selectedSearchFile) {
          //TODO: this.dataService.addNodeObj(this.dbExperiment.expid, this.selectedSearchFile.name, NodeType.SearchResult, null);
        }
      }
    });

    //this.getChildNodes();
  }

  invokeUploadDialog(): Observable<boolean> {
    this.uploadProgressService.setUUID(this.dataItemOfThisComponent.id);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId, disableClose: true, data: {}
    });

    return dialogRef.afterClosed();
  }

  async addFileToUploadData(file: File, fileType: UploadFileTypes, experimentId: string) {
    // TODO: implement use of endpoint for file upload independent from type

    const {metaDataEndpoint, uploadEndpoint} = UploadFileTypeToEndpoints(fileType);

    const metaDataForServer: MPAFile = {
      fileID: '', fileMetaData: JSON.stringify({fileName: file.name}), protdbID: this.proteinDBselection.uuid, experimentID: experimentId, fileType: fileType, fileStatus: ''
    };

    const uploadDataForServer: FileUploadData = {
      uploadFile: file, httpParameters: new HttpParams({fromObject: {jobid: ''}}), fileUploadAdress: uploadEndpoint,
    };

    // send meta data, receive fileuuid
    try {
      const metaDataResponse = await this.uploaderService.postObject<MPAFile, MPAFile>(metaDataForServer, metaDataEndpoint).toPromise();
      if (metaDataResponse !== null) {
        // TODO: evaluate status instead of just checking for null?
        // TODO: jobid = fileID ?
        uploadDataForServer.httpParameters = uploadDataForServer.httpParameters.set('jobid', metaDataResponse.fileID);
        this.uploaderService.addUploadFiles([uploadDataForServer]);
      } else {
        throw new Error('File could not be created');
      }
    } catch (e) {
      this.dialog.getDialogById(this.uploadDialogId).componentInstance.setUploadFailed();
      this.dialog.getDialogById(this.uploadDialogId).componentInstance.uploadFailedMessage = e.message;
      console.error(e);
    }
  }

  onAccept() {
    if (this.displayNameEditing.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.displayNameEditing = '';
    } else if (this.displayNameEditing.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      this.updateExperiment();
    }
  }

  onSetDescription() {
    /**
     * handles description change
     */
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment description';
    dialogInstance.description = this.description;

    dialogRef.afterClosed().subscribe(expDescription => {
      console.log('add description');
      this.dbExperiment.description = expDescription;
      //TODO: const item = this._dataMap.get(this.dbExperiment.expid);
      //item.description = expDescription;
      //TODO: this._dataMap.set(this.dbExperiment.expid, item);
      // TODO: this.dataService.dataMap.next(this._dataMap);
      this.updateExperiment();
    });
  }

  onDelete(type: string) {
    if (type === 'peaklist' && this.hasPeaklistFile) {
      // TODO: this.dataService.removeNode(
      //   this.peaklistFileNode.id, this.id, this.id).subscribe(
      //   del => {
      //     if (del) {
      //       this.hasPeaklistFile = false;
      //       this.peaklistFileNode = undefined;
      //       this.selectedPeaklistFile = undefined;
      //     }
      //   });

    } else if (type === 'searchFile' && this.hasSearchFile) {
      //TODO this.dataService.removeNode(
      //   this.searchFileNode.id, this.id, this.id).subscribe(
      //   del => {
      //     if (del) {
      //       this.hasSearchFile = false;
      //       this.searchFileNode = undefined;
      //       this.selectedSearchFile = undefined;
      //     }
      //   });
    }
    this.disableButton();
    //this.getChildNodes();
  }

  updateExperiment(): void {
    this.dataItemOfThisComponent.displayName = this.displayNameEditing;
    this.dataService.updateNode(this.dataItemOfThisComponent);
  }

  onRemoveExperiment() {
    this.dataService.removeDataItem(this.dataItemOfThisComponent);
  }

  calculateDataStats(mpaData: ProteinGroupObject[]): Datstats {
    let proteinCount = 0;
    let peptideCount = 0;
    let psmCount = 0;
    let spectrumCount = 0;

    for (const group of mpaData) {
      proteinCount += group.proteinList.length;
      peptideCount += group.peptideList.length;
      psmCount += group.psmList.length;
      spectrumCount += group.spectrumIDs.length;
    }

    return {
      totalNoProteinGroups: mpaData.length,
      totalNoProteins: proteinCount,
      totalNoPeptides: peptideCount,
      totalNoPsms: psmCount,
      totalNoSpectra: spectrumCount
    };
  }
}
