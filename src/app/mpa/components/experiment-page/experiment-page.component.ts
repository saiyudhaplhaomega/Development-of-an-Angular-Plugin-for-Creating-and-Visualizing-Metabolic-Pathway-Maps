import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {DataService} from '../data-navigation-tree/services/data.service';
import {DataItem} from '../data-navigation-tree/objects/data-item';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {createNewProteinGroup} from '../mpa-table/mpa-table.component';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {ProteinGroupList} from '../../objects/tableobjects';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../core/components/dialog/dialog.component';
import {TextfieldDialogComponent} from '../../../core/components/textfield-dialog/textfield-dialog.component';
import {ExperimentJSONObject} from '../../objects/experimentjson';
import {ProphaneJobSubmissionDialogComponent} from '../../../prophane/components/prophane-job-submission/prophane-job-submission-dialog';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {MPAFile} from '../../../prophane/objects/mpafile';


@Component({
  selector: 'app-experiment-page',
  templateUrl: './experiment-page.component.html',
  styleUrls: ['./experiment-page.component.css'],
})
export class ExperimentPageComponent implements OnInit, OnDestroy {

  // generated in nav service
  uuid: string;
  name: string;

  dbExperiment = new ExperimentJSONObject();

  description: string;

  creationDate: string;

  dataUploadSelection = 'Peaklist';
  dataUploadOptions: string[] = [
    'Peaklist', 'Search Result', 'Peaklist + Search Result'
  ];

  selectedPeaklistFile: File;
  selectedSearchFile: File;
  selectedFasta: File;

  // to handle displayed options upon File selection
  fileSelected = [false, false];
  fastaFileSelected = true;

  peaklistSelection = 'MZML';
  searchFileSelection = 'MZIdentML';
  uploadFileTypePeaklist: string[] = ['MZML', 'MGF'];
  uploadFileTypeSearch: string[] = ['MZIdentML', 'Mascot-DAT'];

  private _dataMap: Map<string, DataItem>;
  proteinList: ProteinGroupList = {experiment_uuid: this.dbExperiment.exp_id, protein_groups: []};

  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              private uploaderService: AuthenticatedSerializableObjectUploaderService,
              private fileUploaderService: FileUploaderService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.dataMap.subscribe(items => {
      this._dataMap = items;
    });
    console.log(this.dataService);

    this.creationDate = this._dataMap.get(this.uuid).creation_date;
    this.description = this._dataMap.get(this.uuid).description;

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

  onUploadSelectionChange(option: string) {
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fileSelected = [false, false];
    this.fastaFileSelected = true;
    this.dataUploadSelection = option;
  }

  onFileTypeSelectionChange() {
    this.selectedPeaklistFile = undefined;
    this.selectedSearchFile = undefined;
    this.selectedFasta = undefined;
    this.fileSelected = [false, false];
    this.fastaFileSelected = this.searchFileSelection !== 'Mascot-DAT';
  }

  onPeaklistFileChange(files: FileList) {
    this.selectedPeaklistFile = files[0];
    this.fileSelected[0] = true;
  }

  onSearchFileChange(files: FileList) {
    this.selectedSearchFile = files[0];
    this.fileSelected[1] = true;
  }

  onFastaFileChange(files: FileList) {
    this.selectedFasta = files[0];
    this.fastaFileSelected = true;
  }

  onSubmit() {
    // TODO: Only allow one uploaded File of each type



    switch (this.dataUploadSelection) {
      case 'Peaklist':
        if (this.peaklistSelection === 'MGF') {
          this.uploadMGF();
        } else if (this.peaklistSelection === 'MZML') {
          this.uploadMZML();
        }
        break;
      case 'Search Result':
        if (this.searchFileSelection === 'MZIdentML') {
          this.uploadMZIdent();
        } else if (this.peaklistSelection === 'Mascot-DAT') {
          this.uploadDat();
        }
        break;
      case 'Peaklist + Search Results':
        if (this.peaklistSelection === 'MGF') {
          this.uploadMGF();
        } else if (this.peaklistSelection === 'MZML') {
          this.uploadMZML();
        }

        if (this.searchFileSelection === 'MZIdentML') {
          this.uploadMZIdent();
        } else if (this.peaklistSelection === 'Mascot-DAT') {
          this.uploadDat();
        }
        break;
    }

    // TODO: needs to be adjusted if communication with server works
    if (this.selectedPeaklistFile && this.selectedSearchFile) {
      this.dataService.addPeaklist(this.dbExperiment.exp_id);
      this.dataService.addSearch(this.dbExperiment.exp_id);
    } else if (this.selectedPeaklistFile) {
      this.dataService.addPeaklist(this.dbExperiment.exp_id);
    } else if (this.selectedSearchFile) {
      this.dataService.addSearch(this.dbExperiment.exp_id);
    }

  }

  uploadMGF() {
    const fileMetaData = {
      filename: this.selectedPeaklistFile.name,
      experimentuuid: this.dbExperiment.exp_id,
    };
    this.uploaderService.postObjDifferentReturnValue(fileMetaData, 'mpacloud/v1/postMGFMetadata').subscribe(result => {
      const mpaFile: MPAFile = result;
      // TODO: check the response
      console.log(result);

      this.fileUploaderService.postFile(this.selectedPeaklistFile,
        'mpacloud/v1/postuploadMGF' + '?fileid=' + mpaFile.file_UUID + '&experimentid=' +
        mpaFile.experiment_UUID
      ).subscribe(
        event => {
          // if (event.type === HttpEventType.UploadProgress) {
          //   this._uploadProgressService.changeFastaLoaded(event.loaded);
          // } else if (event.type === HttpEventType.Response) {
          //   let response: any;
          //   response = event.body;
          //   this.fastaProgress = 0;
          // }
        },
        error => {
          // if (error.status === 500) {
          //   // handle failed upload
          //   if (this.dialog instanceof ProphaneJobSubmissionDialogComponent) {
          //     this.dialog.setUploadFailed();
          //   }
          // } else {
          //   throw error;
          // }
        }
      );
    });
  }

  uploadMZML() {
    const fileMetaData = {
      filename: this.selectedPeaklistFile.name,
      experimentuuid: this.dbExperiment.exp_id,
    };
    this.uploaderService.postObj(fileMetaData, 'mpacloud/v1/postMZmlMetadata').subscribe(result => {
      if (result != null) {
        console.log(result);
      }
    });
  }

  uploadDat() {
    const fileMetaData = {
      filename: this.selectedSearchFile.name,
      experimentuuid: this.dbExperiment.exp_id,
      fastaFilename: 'TODO',
    };
    this.uploaderService.postObj(fileMetaData, 'mpacloud/v1/postDatMetadata').subscribe(result => {
      if (result != null) {
        console.log(result);
      }
    });
  }

  uploadMZIdent() {
    const fileMetaData = {
      filename: this.selectedSearchFile.name,
      experimentuuid: this.dbExperiment.exp_id,
    };
    this.uploaderService.postObj(fileMetaData, 'mpacloud/v1/postmzidentMetadata').subscribe(result => {
      if (result != null) {
        console.log(result);
      }
    });
  }

  onAccept() {
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

  updateExperiment(): void {

    this.uploaderService.postObj(this.dbExperiment, 'mpacloud/v1/updateExperiment').subscribe(result => {
      if (result != null) {
        console.log(result);
        // value = result;
      }
    });
  }

}
