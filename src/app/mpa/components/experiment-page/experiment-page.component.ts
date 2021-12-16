import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, NodeType} from '../data-navigation-tree/services/data.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClientService} from '../../../core/services/http-client.service';
import {ProteinGroupList} from '../../objects/tableobjects';
import {MatDialog} from '@angular/material';
import {TextfieldDialogComponent} from '../../../core/components/textfield-dialog/textfield-dialog.component';
import {ExperimentJSONObject} from '../../objects/experimentjson';
import {UploadDialogComponent} from '../../../core/components/dialog/upload-dialog.component';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {FileUploadData, MultiFileUploadService} from '../../../core/services/multi-file-upload.service';
import {Endpoints} from '../../../core/services/webserveraddress.service';

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
  proteinList: ProteinGroupList = {experiment_uuid: this.dbExperiment.exp_id, protein_groups: []};
  private _dataMap: Map<string, DataItem>;
  private children: string[];

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              private uploaderService: HttpClientService,
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

    this.uploaderService.postObject<ExperimentJSONObject, ExperimentJSONObject>(
      this.dbExperiment, Endpoints.UNIMPLEMENTED).subscribe(result => {
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

    // TODO: Add promise; nodes should only be added if upload was successful

    if (this.selectedPeaklistFile && this.selectedSearchFile) {
      this.dataService.addNodeObj(this.dbExperiment.exp_id, this.selectedPeaklistFile.name, NodeType.PeakList);
      this.dataService.addNodeObj(this.dbExperiment.exp_id, this.selectedSearchFile.name, NodeType.SearchResult);
    } else if (this.selectedPeaklistFile) {
      this.dataService.addNodeObj(this.dbExperiment.exp_id, this.selectedPeaklistFile.name, NodeType.PeakList);
    } else if (this.selectedSearchFile) {
      this.dataService.addNodeObj(this.dbExperiment.exp_id, this.selectedSearchFile.name, NodeType.SearchResult);
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
      fileMetaData: {
        filename: this.selectedPeaklistFile.name,
        experiment_UUID: this.dbExperiment.exp_id,
        file_UUID: '',
        filetype: 'MGF',
        status: ''
      },
      metaDataAdress: Endpoints.POST_MGF_METADATA,
      fileUploadAdress: Endpoints.UPLOAD_MGF,
    };

    this.multiFileUpload.addSingleUploadFile(MGFData);
  }

  addMZMLtoUploadData() {
    const MZMLData: FileUploadData = {
      uploadFile: this.selectedPeaklistFile,
      fileMetaData: {
        filename: this.selectedPeaklistFile.name,
        experiment_UUID: this.dbExperiment.exp_id,
        file_UUID: '',
        filetype: 'MZML',
        status: ''
      },
      metaDataAdress: Endpoints.POST_MZML_METADATA,
      fileUploadAdress: Endpoints.UPLOAD_MZML,
    };

    this.multiFileUpload.addSingleUploadFile(MZMLData);
  }

  addDatToUploadData() {
    const DatData: FileUploadData = {
      uploadFile: this.selectedSearchFile,
      fileMetaData: {
        filename: this.selectedPeaklistFile.name,
        experiment_UUID: this.dbExperiment.exp_id,
        file_UUID: '',
        filetype: 'DAT',
        status: ''
      },
      metaDataAdress: Endpoints.POST_DAT_METADATA,
      fileUploadAdress: Endpoints.UPLOAD_DAT,
      uploadFasta: this.selectedFasta
    };

    this.multiFileUpload.addSingleUploadFile(DatData);
  }

  addMZIdentToUploadData() {
    const MZIdent: FileUploadData = {
      uploadFile: this.selectedSearchFile,
      fileMetaData: {
        filename: this.selectedPeaklistFile.name,
        experiment_UUID: this.dbExperiment.exp_id,
        file_UUID: '',
        filetype: 'MZIDENT',
        status: ''
      },
      metaDataAdress: Endpoints.POST_MZIDENT_METADATA,
      fileUploadAdress: Endpoints.UPLOAD_MZIDENT
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
    this.uploaderService.postObject<ExperimentJSONObject, ExperimentJSONObject>(
      this.dbExperiment, Endpoints.CREATE_EXPERIMENT).subscribe(result => {
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
