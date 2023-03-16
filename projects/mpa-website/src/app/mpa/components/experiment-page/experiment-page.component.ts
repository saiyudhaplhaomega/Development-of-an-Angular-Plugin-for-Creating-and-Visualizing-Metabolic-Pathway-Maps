import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService2 } from '../data-navigation-tree/services/data2.service';
import { DataItem } from '../data-navigation-tree/objects/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FileUploadData,
  HttpClientService,
  MultiFileUploadData,
  UploadFile,
} from '../../../core/services/http-client.service';
import { ProteinGroupObject } from '../../objects/tableobjects';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../../../core/components/textfield-dialog/textfield-dialog.component';
import { ExperimentJSONObject } from '../../objects/experimentjson';
import { UploadDialogComponent } from '../../../core/components/dialog/upload-dialog.component';
import { UploadProgressService } from '../../../core/services/upload-progress.service';
import { MPAFile, MPAFileObject } from '../../../prophane/objects/mpafile';
import { HttpParams } from '@angular/common/http';
import { UploadFileTypes } from '../../objects/experimentUploadFile';
import { Observable } from 'rxjs';
import { MpaTableDataService } from '../../services/mpa-table-data.service';
import { ContentComponent } from '../../mpa.component';
import { Endpoints } from '../../../core/services/webserveraddress.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface Datstats {
  totalNoProteinGroups: number;
  totalNoProteins: number;
  totalNoPeptides: number;
  totalNoPsms: number;
  totalNoSpectra: number;
}

interface SearchUploadMetadata {
	experimentID: String;
	protdbID: String;
  uploadType: String;
  peaklistFileType: String;
  searchResultFileType: String;
  fastaFileType: String;
  fragmentIonTolerance: number;
  precursorIonTolerance: number;
  fragmentIonToleranceUnit: String;
  precursorIonToleranceUnit: String;
}

class SearchUploadMetadataJSON implements SearchUploadMetadata {
  experimentID: String;
	protdbID: String;
  uploadType: String;
  peaklistFileType: String;
  searchResultFileType: String;
  fastaFileType: String;
  fragmentIonTolerance: number;
  precursorIonTolerance: number;
  fragmentIonToleranceUnit: String;
  precursorIonToleranceUnit: String;
}

export interface ProteinGroupRequest {
  filename: string;
  experimentID: string;
}

enum toleranceUnit {
  Da ='Da',
  PPM = 'ppm'
}

//TODO where to put this?
export class SearchParameters {
  fragmentIonToleranceUnitOptions: string[] = ['ppm','Da'];
  precursorIonToleranceUnitOptions: string[] = ['ppm','Da'];
  fragmentIonToleranceUnitSelection: string = 'ppm';
  precursorIonToleranceUnitSelection: string = 'Da';
  fragmentIonTolerance: number = 10;
  precursorIonTolerance: number = 0.1;

  unitSelectionChange(unit: string, inputTarget: string){
    if(inputTarget == 'fragmentIonTolerance'){
      if(unit != this.fragmentIonToleranceUnitSelection){
        if(unit == toleranceUnit.PPM){
          this.fragmentIonTolerance = 10;
        }
        else if(unit == toleranceUnit.Da){
          this.fragmentIonTolerance = 0.1;
        }
      }
    }
    else if(inputTarget == 'precursorIonTolerance'){
      if(unit != this.precursorIonToleranceUnitSelection){
        if(unit == toleranceUnit.PPM){
          this.precursorIonTolerance = 10;
        }
        else if(unit == toleranceUnit.Da){
          this.precursorIonTolerance = 0.1;
        }
      }
    }

  }

  checkToleranceInput(unit: string, toleranceInput: number, inputTarget: string){
    var adjustedInput: number;
    if(unit == toleranceUnit.PPM){
      if(toleranceInput < 0){
        adjustedInput = 0;
      }
      else if(toleranceInput > 1000){
        adjustedInput = 1000;
      }
      else if(toleranceInput == undefined){
        adjustedInput = 0;
      }
      else {
        adjustedInput = Math.round(toleranceInput);
      }
    }
    else if(unit == toleranceUnit.Da){
      if(toleranceInput < 0.001){
       adjustedInput = 0.001;
      }
      else if(toleranceInput > 1){
        adjustedInput = 1;
      }
      else if(toleranceInput == undefined){
        adjustedInput = 0;
      }
      else {
        adjustedInput = parseFloat(toleranceInput.toPrecision(2));
      }
    }

    if(inputTarget === "fragmentIonTolerance"){
      this.fragmentIonTolerance = adjustedInput;
    }
    else if(inputTarget === "precursorIonTolerance"){
      this.precursorIonTolerance = adjustedInput;
    }
  }
}

@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({visibility: 'hidden', height: 0, })),
      state('expanded', style({ height: '*', })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class ExperimentPageComponent
  implements OnInit, OnDestroy, ContentComponent
{
  dataItemOfThisComponent: DataItem;

  // UI VARIABLES
  // available upload options
  dataUploadSelection = 'Search Result';
  dataUploadOptions: string[] = ['Search Result', 'Peaklist + Search Result'];

  //available interaction modes
  dataUploadModeSelection = 'Result Upload';
  dataUploadModeOptions: string[] = ['Result Upload', 'Search'];

  //advanced search parameters
  advancedSearchExpanded: boolean = false;

  displayNameEditing: string;

  proteinDatabases: DataItem[] = [];
  proteinDBselection = null;

  // button disabling, etc.
  // TODO: can be removed
  hasPeaklistFile: boolean;
  hasSearchFile: boolean;

  // to handle displayed options upon File selection
  fastaFileSelected = true;

  peaklistSelection = UploadFileTypes.MZML;
  searchFileSelection = UploadFileTypes.MZIDENT;

  // available options
  uploadFileTypePeaklist: string[] = [
    UploadFileTypes.MZML,
    UploadFileTypes.MGF,
  ];
  uploadFileTypeSearch: string[] = [
    UploadFileTypes.MZIDENT,
    UploadFileTypes.MASCOT_DAT,
  ];

  buttonDisabled = true;

  hasMpaData = false;
  datStats: Datstats;

  // DATA SUBMISSION VARIABLES
  // files selected via input field
  selectedPeaklistFile: File;
  selectedSearchFile: File;
  selectedFasta: File;

  // metadata for file upload (expid etc.)
  searchUploadMetadata: SearchUploadMetadata;

  //search options
  searchParameters: SearchParameters;

  // files to upload to server
  filesToUpload: MultiFileUploadData;

  // child node elements
  peaklistFileNode: DataItem;
  searchFileNode: DataItem;

  // private _dataMap: Map<string, DataItem>;
  // private children: string[];

  uploadDialogId: string;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService2,
    private httpClientService: HttpClientService,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog,
    private mpaTableDataService: MpaTableDataService
  ) {
    this.uploadDialogId = 'uploadDialog';
  }

  ngOnInit() {
    // this.dataService.dataMap.subscribe(items => {
    //   // TODO: this._dataMap = items;
    // });

    // this.parentUuid = this._dataMap.get(this.id).parent;

    // this.realUUID = this._dataMap.get(this.id).uuid;

    //this.mpaTableDataService.currentExperimentID.next(this.dataItemOfThisComponent.uuid);
    this.mpaTableDataService.expID.next(this.dataItemOfThisComponent.uuid);
    this.displayNameEditing = this.dataItemOfThisComponent.displayName;

    this.proteinDatabases = this.dataService.getProteinDatabases();
    this.proteinDBselection = this.proteinDatabases[0];

    this.mpaTableDataService.requestProteinGroups();

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

    this.searchParameters = new SearchParameters;

    //dataStats, calculate if there is any
    this.mpaTableDataService.mpaTableData.subscribe((mpaData) => {
      this.hasMpaData = mpaData.length > 0;
      if (mpaData.length > 0) {
        this.datStats = this.calculateDataStats(mpaData);
      }
    });



  }

  ngOnDestroy() {
    //this.updateExperiment();
  }

  onProteinDBChange(item: DataItem) {
    console.log(this.proteinDBselection.displayName);
    this.searchUploadMetadata.protdbID = item.uuid;
  }

  onUploadSelectionChange(option: string) {
    /**
     * handles change of the upload type selection (peaklist, search file, peaklist + search file)
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected =
      this.searchFileSelection !== UploadFileTypes.MASCOT_DAT;
    this.dataUploadSelection = option;
    this.disableButton();
  }

  dataUploadModeSelectionChange(option: string) {
    this.dataUploadModeSelection = option;
    this.disableButton();
  }

  expandAdvancedSearchParameters(){
    this.advancedSearchExpanded = !this.advancedSearchExpanded;
  }

  onFileTypeSelectionChange() {
    /**
     * handles change of upload data type
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected =
      this.searchFileSelection !== UploadFileTypes.MASCOT_DAT;
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
      this.buttonDisabled =
        this.hasSearchFile ||
        this.hasPeaklistFile ||
        !this.selectedPeaklistFile ||
        !this.selectedSearchFile ||
        !this.fastaFileSelected;
    } else if (this.dataUploadSelection === 'Peaklist') {
      this.buttonDisabled =
        this.hasPeaklistFile ||
        !this.proteinDBselection ||
        !this.selectedPeaklistFile;
    } else if (this.dataUploadSelection === 'Search Result') {
      this.buttonDisabled =
        this.hasSearchFile ||
        !this.selectedSearchFile ||
        !this.fastaFileSelected;
    }
  }

  async onSubmit() {

    //this.uploaderService.clearUploadFiles();
    // TODO: this doesnt have to be a filed, its just set here ...
    this.filesToUpload = {
      files: [],
      fileUploadAdress: Endpoints.FILES_UPLOAD,
      httpParameters: new HttpParams(),
    };

    this.searchUploadMetadata = new SearchUploadMetadataJSON();
    this.searchUploadMetadata.experimentID = this.dataItemOfThisComponent.uuid
    this.searchUploadMetadata.protdbID = this.proteinDBselection.uuid;

    this.uploadProgressService.reset();
    const onDialogClosingObservable = this.invokeUploadDialog();

    switch (this.dataUploadSelection) {
      case 'Peaklist':
        this.searchUploadMetadata.uploadType = "SEARCH_PEAKLIST";
        this.searchUploadMetadata.peaklistFileType = this.peaklistSelection;
        this.filesToUpload.files.push({uploadFile: this.selectedPeaklistFile, fileID: 'Peaklist'});
        //await this.addFileToUploadData(this.selectedPeaklistFile, this.peaklistSelection, this.dbExperiment.expid);
        // await this.addFileToUploadData(
        //   this.selectedPeaklistFile,
        //   this.peaklistSelection,
        //   'Peaklist'
        // );
        this.hasPeaklistFile = true;
        break;

      case 'Search Result':
        this.searchUploadMetadata.uploadType = 'SEARCH_RESULT';
        this.searchUploadMetadata.searchResultFileType = this.searchFileSelection;
        this.filesToUpload.files.push({uploadFile: this.selectedSearchFile, fileID: 'SearchResult'});
        // await this.addFileToUploadData(
        //   this.selectedSearchFile,
        //   this.searchFileSelection,
        //   'SearchResult'
        // );

        if (this.selectedFasta) {
          this.searchUploadMetadata.fastaFileType = UploadFileTypes.MASCOT_FASTA;
          this.filesToUpload.files.push({uploadFile: this.selectedFasta, fileID: 'MascotFasta'});
          // await this.addFileToUploadData(
          //   this.selectedFasta,
          //   UploadFileTypes.MASCOT_FASTA,
          //  'MascotFasta'
          // );
        }

        this.hasSearchFile = true;
        break;

      case 'Peaklist + Search Result':
        this.searchUploadMetadata.uploadType = "SEARCH_RESULT_PEAKLIST"
        this.searchUploadMetadata.peaklistFileType = this.peaklistSelection;
        this.filesToUpload.files.push({uploadFile: this.selectedPeaklistFile, fileID: 'Peaklist'});
        //await this.addFileToUploadData(this.selectedPeaklistFile, this.peaklistSelection, this.dbExperiment.expid);
        // await this.addFileToUploadData(
        //   this.selectedPeaklistFile,
        //   this.peaklistSelection,
        //   'Peaklist'
        // );
        this.hasPeaklistFile = true;

        this.searchUploadMetadata.searchResultFileType = this.searchFileSelection;
        this.filesToUpload.files.push({uploadFile: this.selectedSearchFile, fileID: 'SearchResult'});
        //await this.addFileToUploadData(this.selectedSearchFile, this.searchFileSelection, this.dbExperiment.expid);
        // await this.addFileToUploadData(
        //   this.selectedSearchFile,
        //   this.searchFileSelection,
        //   'SearchResult'
        // );
        this.hasSearchFile = true;

        if (this.selectedFasta) {
          this.searchUploadMetadata.fastaFileType = UploadFileTypes.MASCOT_FASTA;
          this.filesToUpload.files.push({uploadFile: this.selectedFasta, fileID: 'MascotFasta'});
          //await this.addFileToUploadData(this.selectedFasta, UploadFileTypes.MASCOT_FASTA, this.dbExperiment.expid);
          // await this.addFileToUploadData(
          //   this.selectedFasta,
          //   UploadFileTypes.MASCOT_FASTA,
          //   'MascotFasta'
          // );
        }
        break;
    }

    const configFile = new File(
      [JSON.stringify(this.searchUploadMetadata)],
      'config'
    );
    this.filesToUpload.files.unshift({uploadFile: configFile, fileID: 'config'}); //config HAS to be send first
    
    //this.uploaderService.performUpload(this.uploadDialogId);
    // this.httpClientService.performUpload(
    //   this.uploadDialogId,
    //   this.filesToUpload,
    //   Endpoints.FILES_UPLOAD
    // );

    this.httpClientService.postMultiPartFiles(
          this.filesToUpload,
          Endpoints.FILES_UPLOAD
      ).subscribe((response) => {
        // TODO: simple json response that reports upload success
        // console.log(response);
        // this.ofsData = response;
        // this.loading = false;
      });

    // invoked if upload dialog is closed
    // onDialogClosingObservable.subscribe((uploadFailed) => {
    //   if (!uploadFailed) {
    //     if (this.selectedPeaklistFile) {
    //       //TODO: this.dataService.addNodeObj(this.dbExperiment.expid, this.selectedPeaklistFile.name, NodeType.PeakList, null);
    //     }
    //     if (this.selectedSearchFile) {
    //       //TODO: this.dataService.addNodeObj(this.dbExperiment.expid, this.selectedSearchFile.name, NodeType.SearchResult, null);
    //     }
    //   }
    // });

    //this.getChildNodes();
  }

  invokeUploadDialog(): Observable<boolean> {
    this.uploadProgressService.setUUID(this.dataItemOfThisComponent.id);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: true,
      data: {},
    });

    return dialogRef.afterClosed();
  }

  async addFileToUploadData(
    file: File,
    fileType: UploadFileTypes,
    experimentId: string
  ) {

    // TODO: implement use of endpoint for file upload independent from type

    //const {metaDataEndpoint, uploadEndpoint} = UploadFileTypeToEndpoints(fileType);

    // const metaDataForServer: MPAFile = {
    //   fileID: '',
    //   fileMetaData: JSON.stringify({ fileName: file.name }),
    //   protdbID: this.proteinDBselection.uuid,
    //   experimentID: experimentId,
    //   fileType: fileType,
    //   fileStatus: '',
    // };

    // // send meta data, receive fileuuid
    // try {
    //   const metaDataResponse = await this.httpClientService
    //     .postObject<MPAFile, MPAFile>(
    //       metaDataForServer,
    //       Endpoints.SEARCH_METADATA
    //     )
    //     .toPromise();
    //   if (metaDataResponse !== null) {
    //     // TODO: evaluate status instead of just checking for null?
    //     // TODO: jobid = fileid ?
    //     //uploadDataForServer.httpParameters = uploadDataForServer.httpParameters.set('partid', metaDataResponse.fileID);
    //     const uploadDataForServer: UploadFile = {
    //       uploadFile: file,
    //       fileID: metaDataResponse.fileID,
    //     };
    //     //this.uploaderService.addUploadFiles([uploadDataForServer]);

    //   } else {
    //     throw new Error('File could not be created');
    //   }
    // } catch (e) {
    //   this.dialog
    //     .getDialogById(this.uploadDialogId)
    //     .componentInstance.setUploadFailed();
    //   this.dialog.getDialogById(
    //     this.uploadDialogId
    //   ).componentInstance.uploadFailedMessage = e.message;
    //   console.error(e);
    // }
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
    dialogInstance.description = this.dataItemOfThisComponent.description;

    dialogRef.afterClosed().subscribe((expDescription) => {
      this.dataItemOfThisComponent.description = expDescription;
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
    if (this.dataItemOfThisComponent.uuid) {
    this.dataService.updateExperiment(this.dataItemOfThisComponent);
  }
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
      totalNoSpectra: spectrumCount,
    };
  }
}
