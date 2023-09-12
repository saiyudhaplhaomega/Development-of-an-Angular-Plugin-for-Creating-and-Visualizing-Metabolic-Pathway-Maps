import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DataItem } from '../../model/data-item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientService, MultiFileUploadData } from 'dist/shared-lib';
import { ProteinGroupObject } from '../../model/tableobjects';
import { MatDialog } from '@angular/material/dialog';
import { TextfieldDialogComponent } from '../textfield-dialog/textfield-dialog.component';
import { UploadDialogComponent } from 'shared-lib';
import { UploadProgressService } from 'dist/shared-lib';
import { HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MpaTableDataService,
} from '../../services/mpa-table-data.service';
import { ContentComponent } from '../../mpa.component';
import { Endpoints, WebserveraddressService } from '../../../../mpawebserveraddress.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FileType } from '../../model/filetype';
import { CompareExperimentsDialogComponentComponent } from './compare-experiments-dialog/compare-experiments-dialog-component/compare-experiments-dialog-component.component';
import { ExperimentJSONObject } from '../../model/experimentjson';

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
  peaklistFileType: FileType;
  searchResultFileType: FileType;
  fastaFileType: FileType;
  fragmentIonTolerance: number;
  precursorIonTolerance: number;
  fragmentIonToleranceUnit: IonToleranceUnit;
  precursorIonToleranceUnit: IonToleranceUnit;
}

class SearchUploadMetadataJSON implements SearchUploadMetadata {
  experimentID: String;
  protdbID: String;
  uploadType: String;
  peaklistFileType: FileType;
  searchResultFileType: FileType;
  fastaFileType: FileType;
  fragmentIonTolerance: number;
  precursorIonTolerance: number;
  fragmentIonToleranceUnit: IonToleranceUnit;
  precursorIonToleranceUnit: IonToleranceUnit;
}

export interface ProteinGroupRequest {
  filename: string;
  experimentID: string;
}

enum IonToleranceUnit {
  Da = 'Da',
  PPM = 'ppm',
}

//TODO where to put this?
export class SearchParameters {
  fragmentIonToleranceUnitOptions: string[] = ['ppm', 'Da'];
  precursorIonToleranceUnitOptions: string[] = ['ppm', 'Da'];
  fragmentIonToleranceUnitSelection: string = 'ppm';
  precursorIonToleranceUnitSelection: string = 'Da';
  fragmentIonTolerance: number = 10;
  precursorIonTolerance: number = 0.1;

  unitSelectionChange(unit: string, inputTarget: string) {
    if (inputTarget == 'fragmentIonTolerance') {
      if (unit != this.fragmentIonToleranceUnitSelection) {
        if (unit == IonToleranceUnit.PPM) {
          this.fragmentIonTolerance = 10;
        } else if (unit == IonToleranceUnit.Da) {
          this.fragmentIonTolerance = 0.1;
        }
      }
    } else if (inputTarget == 'precursorIonTolerance') {
      if (unit != this.precursorIonToleranceUnitSelection) {
        if (unit == IonToleranceUnit.PPM) {
          this.precursorIonTolerance = 10;
        } else if (unit == IonToleranceUnit.Da) {
          this.precursorIonTolerance = 0.1;
        }
      }
    }
  }

  checkToleranceInput(
    unit: string,
    toleranceInput: number,
    inputTarget: string
  ) {
    var adjustedInput: number;
    if (unit == IonToleranceUnit.PPM) {
      if (toleranceInput < 0) {
        adjustedInput = 0;
      } else if (toleranceInput > 1000) {
        adjustedInput = 1000;
      } else if (toleranceInput == undefined) {
        adjustedInput = 0;
      } else {
        adjustedInput = Math.round(toleranceInput);
      }
    } else if (unit == IonToleranceUnit.Da) {
      if (toleranceInput < 0.001) {
        adjustedInput = 0.001;
      } else if (toleranceInput > 1) {
        adjustedInput = 1;
      } else if (toleranceInput == undefined) {
        adjustedInput = 0;
      } else {
        adjustedInput = parseFloat(toleranceInput.toPrecision(2));
      }
    }

    if (inputTarget === 'fragmentIonTolerance') {
      this.fragmentIonTolerance = adjustedInput;
    } else if (inputTarget === 'precursorIonTolerance') {
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
      state('collapsed', style({ visibility: 'hidden', height: 0 })),
      state('expanded', style({ height: '*' })),
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
  implements OnInit, OnDestroy, ContentComponent {
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

  peaklistSelection = FileType.MZML;
  searchFileSelection = FileType.MZIDENTML;

  // available options
  uploadFileTypePeaklist: string[] = [FileType.MZML, FileType.MGF];
  uploadFileTypeSearch: string[] = [FileType.MZIDENTML, FileType.DAT];

  buttonDisabled: boolean = true;

  datStats: Datstats;
  hasMpaData: boolean = false;
  hasTaxonomyData: boolean = false;
  hasFunctionData: boolean = false;

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
  experimentDataObject: ExperimentJSONObject;

  constructor(
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private addressService: WebserveraddressService,
    private httpClientService: HttpClientService,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog,
    private mpaTableDataService: MpaTableDataService
  ) {
    this.uploadDialogId = 'uploadDialog';
  }

  ngOnInit() {
    this.mpaTableDataService.expID.next(this.dataItemOfThisComponent.uuid);
    this.displayNameEditing = this.dataItemOfThisComponent.displayName;

    this.proteinDatabases = this.dataService.getProteinDatabases();
    this.proteinDBselection = this.proteinDatabases[0];
    
    this.dataService.getExperimentData(this.dataItemOfThisComponent.uuid).subscribe((experimentData: ExperimentJSONObject) => {
      this.experimentDataObject = experimentData;
      if (this.experimentDataObject.isSearched) {
        this.mpaTableDataService.requestProteinGroups().subscribe({
          next: res => {
            if (res) {
              this.hasMpaData = true;
              this.datStats = this.calculateDataStats(this.mpaTableDataService.mpaTableData.value);
            } else {
              this.hasMpaData = false;
            }
          }
        });
      } else {
        this.hasMpaData = false;
      }
    });

    this.searchParameters = new SearchParameters();
  }

  ngOnDestroy() {
    //this.updateExperiment();
  }

  onProteinDBChange(item: DataItem): void {
    console.log(this.proteinDBselection.displayName);
    this.searchUploadMetadata.protdbID = item.uuid;
  }

  onUploadSelectionChange(option: string): void {
    /**
     * handles change of the upload type selection (peaklist, search file, peaklist + search file)
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected = this.searchFileSelection !== FileType.DAT;
    this.dataUploadSelection = option;
    this.disableButton();
  }

  dataUploadModeSelectionChange(option: string): void {
    this.dataUploadModeSelection = option;
    this.disableButton();
  }

  expandAdvancedSearchParameters(): void {
    this.advancedSearchExpanded = !this.advancedSearchExpanded;
  }

  onFileTypeSelectionChange(): void {
    /**
     * handles change of upload data type
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected = this.searchFileSelection !== FileType.DAT;
    this.disableButton();
  }

  // functions to handle selection of upload files
  onPeaklistFileChange(files: FileList): void {
    this.selectedPeaklistFile = files[0];
    this.disableButton();
  }

  onSearchFileChange(files: FileList): void {
    this.selectedSearchFile = files[0];
    this.disableButton();
  }

  onFastaFileChange(files: FileList): void {
    this.selectedFasta = files[0];
    this.fastaFileSelected = true;
    this.disableButton();
  }

  disableButton(): void {
    /**
     * checks if files are selected or uploaded already and disables the submit button
     */
    if (this.dataUploadModeSelection === 'Search') {
      this.buttonDisabled =
        this.hasPeaklistFile ||
        !this.proteinDBselection ||
        !this.selectedPeaklistFile;
    } else if (this.dataUploadModeSelection === 'Result Upload') {
      if (this.dataUploadSelection === 'Peaklist + Search Result') {
        this.buttonDisabled =
          this.hasSearchFile ||
          this.hasPeaklistFile ||
          !this.selectedPeaklistFile ||
          !this.selectedSearchFile ||
          !this.fastaFileSelected;
      } else if (this.dataUploadSelection === 'Search Result') {
        this.buttonDisabled =
          this.hasSearchFile ||
          !this.selectedSearchFile ||
          !this.fastaFileSelected;
      }
    }
  }

  async onSubmit() {
    // TODO: this doesnt have to be a filed, its just set here ...
    this.filesToUpload = {
      files: [],
      httpParameters: new HttpParams(),
    };

    this.searchUploadMetadata = new SearchUploadMetadataJSON();
    this.searchUploadMetadata.experimentID = this.dataItemOfThisComponent.uuid;
    this.searchUploadMetadata.protdbID = this.proteinDBselection.uuid;

    this.uploadProgressService.reset();
    const onDialogClosingObservable = this.invokeUploadDialog();

    switch (this.dataUploadModeSelection) {
      case 'Search':
        this.searchUploadMetadata.uploadType = 'SEARCH_PEAKLIST';
        this.searchUploadMetadata.peaklistFileType = this.peaklistSelection;
        this.filesToUpload.files.push({
          uploadFile: this.selectedPeaklistFile,
          fileID: 'Peaklist',
        });
        this.hasPeaklistFile = true;
        break;
      case 'Result Upload':
        switch (this.dataUploadSelection) {
          case 'Search Result':
            this.searchUploadMetadata.uploadType = 'SEARCH_RESULT';
            this.searchUploadMetadata.searchResultFileType =
              this.searchFileSelection;
            this.filesToUpload.files.push({
              uploadFile: this.selectedSearchFile,
              fileID: 'SearchResult',
            });
            if (this.selectedFasta) {
              this.searchUploadMetadata.fastaFileType = FileType.MASCOT_FASTA;
              this.filesToUpload.files.push({
                uploadFile: this.selectedFasta,
                fileID: 'MascotFasta',
              });
            }
            this.hasSearchFile = true;
            break;

          case 'Peaklist + Search Result':
            this.searchUploadMetadata.uploadType = 'SEARCH_RESULT_PEAKLIST';
            this.searchUploadMetadata.peaklistFileType = this.peaklistSelection;
            this.filesToUpload.files.push({
              uploadFile: this.selectedPeaklistFile,
              fileID: 'Peaklist',
            });
            this.hasPeaklistFile = true;

            this.searchUploadMetadata.searchResultFileType =
              this.searchFileSelection;
            this.filesToUpload.files.push({
              uploadFile: this.selectedSearchFile,
              fileID: 'SearchResult',
            });
            this.hasSearchFile = true;

            if (this.selectedFasta) {
              this.searchUploadMetadata.fastaFileType = FileType.MASCOT_FASTA;
              this.filesToUpload.files.push({
                uploadFile: this.selectedFasta,
                fileID: 'MascotFasta',
              });
            }
            break;
        }
    }

    const configFile = new File(
      [JSON.stringify(this.searchUploadMetadata)],
      'config'
    );
    this.filesToUpload.files.unshift({
      uploadFile: configFile,
      fileID: 'config',
    }); //config HAS to be send first

    //this.uploaderService.performUpload(this.uploadDialogId);
    // this.httpClientService.performUpload(
    //   this.uploadDialogId,
    //   this.filesToUpload,
    //   Endpoints.FILES_UPLOAD
    // );
    this.uploadProgressService.addToTotal(
      this.filesToUpload.files[0].uploadFile.size
    );

    this.httpClientService
      .postMultiPartFilesEvents(this.filesToUpload, this.addressService.getEndpoint(Endpoints.FILES_UPLOAD))
      .subscribe({
        next: (event) => {
          console.log('unknown event');
          console.log(event);
          console.log(event.type);
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgressService.changeReportLoaded(event.loaded);
            console.log('UploadProgress event');
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log('Response event');
            console.log(event);
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status >= 400) {
            // handle failed upload
            if (this.dialog.getDialogById(this.uploadDialogId)) {
              this.dialog
                .getDialogById(this.uploadDialogId)
                .componentInstance.setUploadFailed();
              this.dialog.getDialogById(
                this.uploadDialogId
              ).componentInstance.uploadFailedMessage = error.statusText;
            }
          } else {
            throw error;
          }
        },
      });

    // invoked if upload dialog is closed
    onDialogClosingObservable.subscribe((uploadFailed) => {
      console.log('dialog closing');
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

  invokeUploadDialog(): Observable<any> {
    this.uploadProgressService.setUUID(this.dataItemOfThisComponent.id);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: true,
      data: { successMessage: 'Upload successful.' },
    });

    return dialogRef.afterClosed();
  }

  //TODO refactoring: safe current name, set current name again if new name is not allowed
  // onAccept(): void {
  //   if (this.displayNameEditing.length > 24) {
  //     this._snackBar.open('Names longer than 24 characters are not allowed!');
  //     setTimeout(() => {this._snackBar.dismiss()},4000);
  //     this.displayNameEditing = '';
  //   } else if (this.displayNameEditing.length <= 0) {
  //     this._snackBar.open('Empty names are not allowed!');
  //     setTimeout(() => {this._snackBar.dismiss()},4000);
  //   } else {
  //     this.updateExperiment();
  //   }
  // }

  // handles change of display name
  onSetName(): void {
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment name';
    dialogInstance.value = this.dataItemOfThisComponent.displayName;
    dialogInstance.valueLabel = 'name';
    dialogInstance.hasValidators = true;

    dialogRef.beforeClosed().subscribe((expName) => {
      if (expName) {
        this.dataItemOfThisComponent.displayName = expName;
        this.updateExperiment();
      }
    })
  }

  onSetDescription(): void {
    /**
     * handles description change
     */
    const dialogRef = this.dialog.open(TextfieldDialogComponent, {
      disableClose: true,
    });

    const dialogInstance = dialogRef.componentInstance;
    dialogInstance.dialogPrompt = 'Edit experiment description';
    dialogInstance.value = this.dataItemOfThisComponent.description;
    dialogInstance.valueLabel = 'description';

    dialogRef.beforeClosed().subscribe((expDescription) => {
      if(expDescription) {
        this.dataItemOfThisComponent.description = expDescription;
        this.updateExperiment();
      }
    });
  }

  onDelete(type: string): void {
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
    if (this.dataItemOfThisComponent.uuid) {
      this.dataService.updateExperiment(this.dataItemOfThisComponent);
    }
  }

  onRemoveExperiment(): void {
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

  onCompareExperiments(): void {
    const parentFolderDataObject: DataItem = this.dataService.getDataItemFromId(this.dataItemOfThisComponent.parent);

    const dialogRef = this.dialog.open(CompareExperimentsDialogComponentComponent, {
      disableClose: true,
      data: { parentFolderDataObject: parentFolderDataObject, expName: this.dataItemOfThisComponent.displayName, expID: this.dataItemOfThisComponent.uuid },
    });
  }

}
