import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {DataService} from '../data-navigation-tree/services/data.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {createNewProteinGroup} from '../mpa-table/mpa-table.component';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {ProteinGroupList} from '../../objects/tableobjects';
import {MatDialog} from '@angular/material';
import {TextfieldDialogComponent} from '../../../core/components/textfield-dialog/textfield-dialog.component';
import {ExperimentJSONObject} from '../../objects/experimentjson';
import {UploadDialogComponent} from '../../../core/components/dialog/upload-dialog.component';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {MPAFile} from '../../../prophane/objects/mpafile';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {FileUploadData, MultiFileUploadService} from '../../../core/services/multi-file-upload.service';

@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css'],
})
export class ExperimentPageComponent implements OnInit, OnDestroy {

  // generated in nav service
  uuid: string;
  parentUuid: string;
  name: string;
  dbExperiment = new ExperimentJSONObject();
  description: string;
  creationDate: string;

  // selection of upload options
  dataUploadSelection = 'Peaklist';
  dataUploadOptions: string[] = [
    'Peaklist', 'Search Result', 'Peaklist + Search Result'
  ];

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

  peaklistSelection = 'MZML';
  searchFileSelection = 'MZIdentML';
  uploadFileTypePeaklist: string[] = ['MZML', 'MGF'];
  uploadFileTypeSearch: string[] = ['MZIdentML', 'Mascot-DAT'];

  buttonDisabled = true;

  private _dataMap: Map<string, DataItem>;
  proteinList: ProteinGroupList = {experiment_uuid: this.dbExperiment.exp_id, protein_groups: []};

  private children: string[];

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              private uploaderService: AuthenticatedSerializableObjectUploaderService,
              private fileUploaderService: FileUploaderService,
              private uploadProgressService: UploadProgressService,
              private dialog: MatDialog,
              private multiFileUpload: MultiFileUploadService) {
  }

  ngOnInit() {
    console.log('initialized');

    this.dataService.dataMap.subscribe(items => {
      this._dataMap = items;
    });

    this.parentUuid = this._dataMap.get(this.uuid).parent;

    this.creationDate = this._dataMap.get(this.uuid).creation_date;
    this.description = this._dataMap.get(this.uuid).description;

    this.getChildNodes();

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

    // // get protein lists from server
    // this.uploaderService.postObj<ProteinGroupList>({experiment_uuid: this.uuid, protein_groups: []},
    //   'mpacloud/v1/fetchProteinGroups').subscribe( data => {
    //   this.proteinList = data;
    // }, err => {
    //   const protein_groups = [];
    //   for (let i = 1; i <= 100; i++) { protein_groups.push(createNewProteinGroup(i)); }
    //   this.proteinList = {experiment_uuid: this.uuid, protein_groups: protein_groups};
    // });

    this.dbExperiment.exp_id = this.uuid;

    this.uploaderService.postObj<ExperimentJSONObject>(this.dbExperiment, 'mpacloud/v1/getExperiment').subscribe(result => {
      if (result != null) {
        console.log(result);
        this.dbExperiment = result;
        // value = result;
      }
    });
  }

  ngOnDestroy() {
    this.updateExperiment();
  }

  errorHandler(error: HttpErrorResponse) {
  }

  getChildNodes() {
    this.children = this._dataMap.get(this.uuid).children;

    this.children.map(child => {
      if (this._dataMap.get(child).type === 'searchresult') {
        this.hasSearchFile = true;
        this.searchFileNode = this._dataMap.get(child);
      } else if (this._dataMap.get(child).type === 'peaklist') {
        this.hasPeaklistFile = true;
        this.peaklistFileNode = this._dataMap.get(child);
      }
    });
  }

  onUploadSelectionChange(option: string) {
    /**
     * handles change of the upload type selection (peaklist, search file, peaklist + search file)
     */
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fastaFileSelected = this.searchFileSelection !== 'Mascot-DAT';
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
    this.fastaFileSelected = this.searchFileSelection !== 'Mascot-DAT';
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
      this.buttonDisabled = this.hasSearchFile || this.hasPeaklistFile || !this.selectedPeaklistFile || !this.selectedSearchFile ||
        !this.fastaFileSelected;
    } else if (this.dataUploadSelection === 'Peaklist') {
      this.buttonDisabled = this.hasPeaklistFile || !this.selectedPeaklistFile;
    } else if (this.dataUploadSelection === 'Search Result') {
      this.buttonDisabled = this.hasSearchFile || !this.selectedSearchFile || !this.fastaFileSelected;
    }
  }

  onSubmit() {
    this.uploadProgressService.reset();
    this.multiFileUpload.clearUploadFiles();
    // this.openUploadDialog();

    switch (this.dataUploadSelection) {
      case 'Peaklist':
        if (this.peaklistSelection === 'MGF') {
          // this.addMGFtoUploadData();
        } else if (this.peaklistSelection === 'MZML') {
          // this.addMZMLtoUploadData();
        }
        this.hasPeaklistFile = true;
        // this.multiFileUpload.performUpload();
        break;

      case 'Search Result':
        if (this.searchFileSelection === 'MZIdentML') {
          // this.addMZIdentToUploadData();
        } else if (this.peaklistSelection === 'Mascot-DAT') {
          // this.addDatToUploadData();
        }
        this.hasSearchFile = true;
        // this.multiFileUpload.performUpload();
        break;

      case 'Peaklist + Search Result':
        if (this.peaklistSelection === 'MGF') {
          // this.addMGFtoUploadData();
        } else if (this.peaklistSelection === 'MZML') {
          // this.addMZMLtoUploadData();
        }
        this.hasPeaklistFile = true;

        if (this.searchFileSelection === 'MZIdentML') {
          // this.addMZIdentToUploadData();
        } else if (this.peaklistSelection === 'Mascot-DAT') {
          // this.addDatToUploadData();
        }
        this.hasSearchFile = true;
        // this.multiFileUpload.performUpload();
        break;
    }

    // TODO: Add promise; nodes should only be added if upload was succesful

    if (this.selectedPeaklistFile && this.selectedSearchFile) {
      this.dataService.addPeaklist(this.dbExperiment.exp_id, this.selectedPeaklistFile.name);
      this.dataService.addSearch(this.dbExperiment.exp_id, this.selectedSearchFile.name);
    } else if (this.selectedPeaklistFile) {
      this.dataService.addPeaklist(this.dbExperiment.exp_id, this.selectedPeaklistFile.name);
    } else if (this.selectedSearchFile) {
      this.dataService.addSearch(this.dbExperiment.exp_id, this.selectedSearchFile.name);
    }

    this.getChildNodes();
  }

  openUploadDialog(): void {
    this.uploadProgressService.setUUID(this.uuid);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: 'uploadDialog',
      disableClose: true,
      data: {noRedirect: true}
    });
  }

  // functions to add file and metadata to upload list
  addMGFtoUploadData() {
    const MGFData: FileUploadData = {
      uploadFile: this.selectedPeaklistFile,
      fileMetaData: {filename: this.selectedPeaklistFile.name, experimentuuid: this.dbExperiment.exp_id},
      metaDataAdress: 'mpacloud/v1/postMGFMetadata',
      fileUploadAdress: 'mpacloud/v1/postuploadMGF',
    };

    this.multiFileUpload.addSingleUploadFile(MGFData);
  }

  addMZMLtoUploadData() {
    const MZMLData: FileUploadData = {
      uploadFile: this.selectedPeaklistFile,
      fileMetaData: {filename: this.selectedPeaklistFile.name, experimentuuid: this.dbExperiment.exp_id},
      metaDataAdress: 'mpacloud/v1/postMZmlMetadata',
      fileUploadAdress: 'mpacloud/v1/postuploadMZml',
    };

    this.multiFileUpload.addSingleUploadFile(MZMLData);
  }

  addDatToUploadData() {
    const DatData: FileUploadData = {
      uploadFile: this.selectedSearchFile,
      fileMetaData: {filename: this.selectedSearchFile.name, experimentuuid: this.dbExperiment.exp_id},
      metaDataAdress: 'mpacloud/v1/postuploadDat',
      fileUploadAdress: 'mpacloud/v1/postuploadDat',
      uploadFasta: this.selectedFasta
    };

    this.multiFileUpload.addSingleUploadFile(DatData);
  }

  addMZIdentToUploadData() {
    const MZIdent: FileUploadData = {
      uploadFile: this.selectedSearchFile,
      fileMetaData: {filename: this.selectedSearchFile.name, experimentuuid: this.dbExperiment.exp_id},
      metaDataAdress: 'mpacloud/v1/postmzidentMetadata',
      fileUploadAdress: 'mpacloud/v1/postuploadmzident'
    };

    this.multiFileUpload.addSingleUploadFile(MZIdent);
  }

  onAccept() {
    /**
     * handles change of the experiment name
     */
    if (this.dbExperiment.name.length > 24) {
      this._snackBar.open('Names longer than 24 characters are not allowed!');
      this.dbExperiment.name = '';
    } else if (this.dbExperiment.name.length <= 0) {
      this._snackBar.open('Empty names are not allowed!');
    } else {
      const item = this._dataMap.get(this.dbExperiment.exp_id);
      item.displayName = this.dbExperiment.name;
      this._dataMap.set(this.dbExperiment.exp_id, item);
      this.dataService.dataMap.next(this._dataMap);
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
      const item = this._dataMap.get(this.dbExperiment.exp_id);
      item.description = expDescription;
      this._dataMap.set(this.dbExperiment.exp_id, item);
      this.dataService.dataMap.next(this._dataMap);
      this.updateExperiment();
    });
  }

  onDelete(type: string) {
    if (type === 'peaklist' && this.hasPeaklistFile) {
      this.dataService.removeNode(
        this.peaklistFileNode.uuid, this.uuid, this.uuid).subscribe(
          del => {
            if (del) {
              this.hasPeaklistFile = false;
              this.peaklistFileNode = undefined;
              this.selectedPeaklistFile = undefined;
            }
    });

    } else if (type === 'searchFile' && this.hasSearchFile) {
      this.dataService.removeNode(
        this.searchFileNode.uuid, this.uuid, this.uuid).subscribe(
        del => {
          if (del) {
            this.hasSearchFile = false;
            this.searchFileNode = undefined;
            this.selectedSearchFile = undefined;
          }
        });
    }
    this.disableButton();
    this.getChildNodes();
  }

  updateExperiment(): void {
    /**
     * updates server when the experiment page is left
     */
    this.uploaderService.postObj(this.dbExperiment, 'mpacloud/v1/updateExperiment').subscribe(result => {
      if (result != null) {
        console.log(result);
        // value = result;
      }
    });
  }

  onRemoveExperiment() {
    this.dataService.removeNode(this.uuid, this.uuid, this.parentUuid);
  }
}
