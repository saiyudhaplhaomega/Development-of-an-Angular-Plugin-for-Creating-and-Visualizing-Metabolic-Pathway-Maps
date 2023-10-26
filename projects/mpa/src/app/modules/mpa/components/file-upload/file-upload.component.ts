import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataItem } from '../../model/data-item';
import { FileType } from '../../model/filetype';
import { FilesUploadMetadata, FilesUploadMetadataJSON } from '../../model/filesuploadmetadatajson';
import { SearchParameters } from '../../model/search-parameters';
import { HttpClientService, MultiFileUploadData, UploadDialogComponent, UploadProgressService } from 'shared-lib';
import { DataService, NodeType } from '../../services/data.service';
import { Endpoints, WebserveraddressService } from 'projects/mpa/src/app/mpawebserveraddress.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, takeWhile } from 'rxjs';
import { HttpEventType, HttpParams } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NodeNameValidator } from '../name-edit-dialog/name-edit-dialog.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ visibility: 'hidden', height: 0, opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
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
  ]
})
export class FileUploadComponent implements OnInit {

  @Input() parentDataItem: DataItem;



  existingNodeNames: string[];
  experimentForm: UntypedFormGroup;
  intentToUpload: boolean;
  uploadDialogId: string;
  // UI VARIABLES
  // available upload options
  dataUploadSelection: string = 'Search Result';
  dataUploadOptions: string[] = ['Search Result', 'Peaklist + Search Result'];

  //available interaction modes
  dataUploadModeSelection: string = 'Result Upload';
  dataUploadModeOptions: string[] = ['Result Upload', 'Search'];

  //available upload types (amount of files)
  fileAmountSelection: string = 'Single';
  fileAmountOptions: string[] = ['Single', 'Multi'];

  //advanced search parameters
  advancedSearchExpanded: boolean = false;
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
  buttonDisabled: boolean = false;
  // DATA SUBMISSION VARIABLES
  // files selected via input field
  selectedPeaklistFiles: File[];
  selectedPeaklistFile: File;
  selectedSearchFile: File;
  selectedFasta: File;

  //search options
  searchParameters: SearchParameters;

  // files to upload to server
  // metadata for file upload (expid etc.)
  filesUploadMetadata: FilesUploadMetadata;
  filesToUpload: MultiFileUploadData;

  constructor(
    private dataService: DataService,
    private addressService: WebserveraddressService,
    private httpClientService: HttpClientService,
    private uploadProgressService: UploadProgressService,
    private fb: UntypedFormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.existingNodeNames = this.dataService.getExistingNodeNames();
    this.proteinDatabases = this.dataService.getProteinDatabases();
    this.proteinDBselection = this.proteinDatabases[0];
    this.selectedPeaklistFiles = [];
    this.searchParameters = new SearchParameters();
    this.parentDataItem.type == 'folder' ? this.intentToUpload = false : this.intentToUpload = true;
    this.experimentForm = this.fb.group({
      expName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(24),
          Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
          NodeNameValidator(this.existingNodeNames)
        ],
      ],
    });
    this.experimentForm.get('expName').valueChanges.subscribe({
      next: value => {
        this.disableButton()
      }
    })
    if (this.parentDataItem.type == 'folder') {
      this.dataUploadModeSelection = 'Search';
    }
    this.filesUploadMetadata = new FilesUploadMetadataJSON();
  }

  onProteinDBChange(item: DataItem): void {
    this.filesUploadMetadata.protdbID = item.uuid;
  }

  fileAmountSelectionChange() {
    console.log(this.fileAmountSelection)
    this.disableButton();
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

  intentToUploadChange() {
    !this.intentToUpload ? this.fileAmountSelection = this.fileAmountOptions[0] : {};
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
  onPeaklistFileChange(fileList: FileList): void {
    this.selectedPeaklistFile = fileList[0];
    let files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    this.selectedPeaklistFiles = files;
    this.disableButton();
    console.log(this.selectedPeaklistFile.name + " " + this.selectedPeaklistFiles.length)
  }

  getFileNames(fileList: File[]) {
    let names: string = '';
    for (let i in fileList) {
      names.length > 1 ? names += ", " + fileList[i].name : names = fileList[i].name;
    }
    return names;
  }

  onSearchFileChange(fileList: FileList): void {
    this.selectedSearchFile = fileList[0];
    this.disableButton();
  }

  onFastaFileChange(fileList: FileList): void {
    this.selectedFasta = fileList[0];
    this.fastaFileSelected = true;
    this.disableButton();
  }

  disableButton(): void {
    /**
     * checks if files are selected or uploaded already and disables the submit button
     */
    if (this.intentToUpload) {
      if (this.parentDataItem.type == 'folder') {
        if (this.fileAmountSelection == 'Single') {
          if (this.experimentForm.get('expName').valid && this.experimentForm.get('expName').dirty) {
            this.buttonDisabled =
              this.hasPeaklistFile ||
              !this.proteinDBselection ||
              !this.selectedPeaklistFile;
          } else {
            this.buttonDisabled = true;
          }
        } else {
          this.buttonDisabled =
            this.hasPeaklistFile ||
            !this.proteinDBselection ||
            !this.selectedPeaklistFile;
        }
      } else {
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
    } else {
      this.experimentForm.get('expName').valid ? this.buttonDisabled = false : this.buttonDisabled = true;
    }
  }

  async onSubmit() {
    if (this.intentToUpload) {
      this.uploadProgressService.reset();
      const onDialogClosingObservable = this.invokeUploadDialog();

      if (this.fileAmountSelection == 'Single') {
        console.log("single");
        this.filesToUpload = {
          files: [],
          httpParameters: new HttpParams(),
        };
        this.filesUploadMetadata = new FilesUploadMetadataJSON();
        // this.filesUploadMetadata.experimentID = this.parentDataItem.uuid;
        this.filesUploadMetadata.protdbID = this.proteinDBselection.uuid;
        switch (this.dataUploadModeSelection) {
          case 'Search':
            this.filesUploadMetadata.uploadType = 'SEARCH_PEAKLIST';
            this.filesUploadMetadata.peaklistFileType = this.peaklistSelection;
            this.filesToUpload.files.push({
              uploadFile: this.selectedPeaklistFile,
              fileID: 'Peaklist',
            });
            this.hasPeaklistFile = true;
            break;
          case 'Result Upload':
            switch (this.dataUploadSelection) {
              case 'Search Result':
                this.filesUploadMetadata.uploadType = 'SEARCH_RESULT';
                this.filesUploadMetadata.searchResultFileType =
                  this.searchFileSelection;
                this.filesToUpload.files.push({
                  uploadFile: this.selectedSearchFile,
                  fileID: 'SearchResult',
                });
                if (this.selectedFasta) {
                  this.filesUploadMetadata.fastaFileType = FileType.MASCOT_FASTA;
                  this.filesToUpload.files.push({
                    uploadFile: this.selectedFasta,
                    fileID: 'MascotFasta',
                  });
                }
                this.hasSearchFile = true;
                break;

              case 'Peaklist + Search Result':
                this.filesUploadMetadata.searchResultFileType =
                  this.searchFileSelection;
                this.filesToUpload.files.push({
                  uploadFile: this.selectedSearchFile,
                  fileID: 'SearchResult',
                });
                this.hasSearchFile = true;

                this.filesUploadMetadata.uploadType = 'SEARCH_RESULT_PEAKLIST';
                this.filesUploadMetadata.peaklistFileType = this.peaklistSelection;
                this.filesToUpload.files.push({
                  uploadFile: this.selectedPeaklistFile,
                  fileID: 'Peaklist',
                });
                this.hasPeaklistFile = true;

                if (this.selectedFasta) {
                  this.filesUploadMetadata.fastaFileType = FileType.MASCOT_FASTA;
                  this.filesToUpload.files.push({
                    uploadFile: this.selectedFasta,
                    fileID: 'MascotFasta',
                  });
                }
                break;
            }
        }

        if (this.parentDataItem.type == "experiment") {
          this.filesUploadMetadata.experimentID = this.parentDataItem.uuid;
        } else {
          let node = this.dataService.createNewDataItem(this.parentDataItem, '', NodeType.Experiment);
          let take = true;
          this.dataService.dataMap.pipe(takeWhile(() => take == true)).subscribe(() => {
            if (node.uuid) {
              this.filesUploadMetadata.experimentID = node.uuid;
              take = false;
            }
          })
        }
        const configFile = new File(
          [JSON.stringify(this.filesUploadMetadata)],
          'config'
        );
        this.filesToUpload.files.unshift({
          uploadFile: configFile,
          fileID: 'config',
        });
        for (let file of this.filesToUpload.files) {
          this.uploadProgressService.addToTotal(
           file.uploadFile.size
          );
        }

        this.executeUpload(this.filesToUpload);

      } else if (this.fileAmountSelection == 'Multi') {  //multi is only available in folder-component and for searches
        for (let i in this.selectedPeaklistFiles) {
          this.uploadProgressService.addToTotal(this.selectedPeaklistFiles[i].size);
          let files: MultiFileUploadData = {
            files: [],
            httpParameters: new HttpParams()
          }
          files.files.push({
            uploadFile: this.selectedPeaklistFiles[i],
            fileID: 'Peaklist'
          });
          let name = this.selectedPeaklistFiles[i].name.split('.');
          name.pop();
          let node = this.dataService.createNewDataItem(this.parentDataItem, name.join(''), NodeType.Experiment);
          let take = true;
          this.dataService.dataMap.pipe(takeWhile(() => take == true)).subscribe(() => {
            if (node.uuid) {
              let metadata: FilesUploadMetadata = new FilesUploadMetadataJSON();
              metadata.uploadType = 'SEARCH_PEAKLIST';
              metadata.peaklistFileType = this.peaklistSelection;
              metadata.protdbID = this.proteinDBselection.uuid;
              metadata.experimentID = node.uuid;
              const configFile = new File(
                [JSON.stringify(metadata)],
                'config'
              )
              files.files.unshift({
                uploadFile: configFile,
                fileID: 'config'
              })
              //TODO upload files
              this.executeUpload(files);
              this.uploadProgressService.changeReportLoaded(this.selectedPeaklistFiles[i].size);
              take = false;
            }
          })
        }
      }
    } else {
      this.dataService.createNewDataItem(this.parentDataItem, this.experimentForm.get('expName').value, NodeType.Experiment);
    }
    // // invoked if upload dialog is closed
    // onDialogClosingObservable.subscribe((uploadFailed) => {
    //   console.log('dialog closing');
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

  invokeUploadDialog(): Observable<any> {
    this.uploadProgressService.setUUID(this.parentDataItem.id);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: true,
      data: { successMessage: 'Upload successful.' },
    });

    return dialogRef.afterClosed();
  }

  executeUpload(files: MultiFileUploadData) {
    this.httpClientService
      .postMultiPartFilesEvents(files, this.addressService.getEndpoint(Endpoints.FILES_UPLOAD))
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
  }

  //errorMessage for the name form
  getNameErrorMessage(): string {
    if (this.experimentForm.get('expName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.experimentForm.get('expName').hasError('pattern')) {
      return 'No white spaces or special chars';
    } else {
      return '';
    }
  }

}
