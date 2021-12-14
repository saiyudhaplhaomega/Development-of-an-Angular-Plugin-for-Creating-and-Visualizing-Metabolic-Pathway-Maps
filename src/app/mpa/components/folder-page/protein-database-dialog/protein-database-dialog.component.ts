import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataItem} from '../../data-navigation-tree/objects/data-item';
import {DataService} from '../../data-navigation-tree/services/data.service';
import {folderNameValidator} from '../../../../core/components/dialog/name-edit-dialog.component';
import {UploadProgressService} from '../../../../core/services/upload-progress.service';
import {FileUploaderService} from '../../../../core/services/file-uploader.service';
import {Endpoints, WebserveraddressService} from '../../../../core/services/webserveraddress.service';
import {AuthenticatedSerializableObjectUploaderService} from '../../../../core/services/authenticated-serializable-object-uploader.service';
import {FileUploadData, MultiFileUploadService} from '../../../../core/services/multi-file-upload.service';
import {FileMetaData} from '../../../objects/FileMetaData';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-protein-database-dialog',
  templateUrl: './protein-database-dialog.component.html',
  styleUrls: ['./protein-database-dialog.component.css']
})
export class ProteinDatabaseDialogComponent implements OnInit {

  proteinDBForm: FormGroup;
  existingNodeNames: string[];
  private _dataMap: Map<string, DataItem>;

  dbName: string;
  dbFile: File;

  constructor(
    public dialogRef: MatDialogRef<ProteinDatabaseDialogComponent>,
    private fb: FormBuilder,
    private dataService: DataService,
    private uploaderService: AuthenticatedSerializableObjectUploaderService,
    private fileUploaderService: FileUploaderService,
    private uploadProgressService: UploadProgressService,
    private multiFileUpload: MultiFileUploadService
    ) { }

  ngOnInit() {
    this.dataService.dataMap.subscribe( items => {
      this._dataMap = items;
    });

    this.existingNodeNames = [];

    for (const [key, value] of this._dataMap.entries()) {
      this.existingNodeNames.push(value.displayName);
    }

    this.proteinDBForm = this.fb.group({
      dbName: ['', [
        Validators.required,
        Validators.pattern('[äÄöÖüÜa-zA-Z0-9_-]*'),
        folderNameValidator(this.existingNodeNames)
      ]],
      dbFile: ['', [
        Validators.required
      ]]
    });
  }

  getErrorMessage() {
    if (this.proteinDBForm.get('dbName').hasError('required')) {
      return 'Please enter a name';
    } else if (this.proteinDBForm.get('dbName').hasError('pattern')) {
      return 'no white spaces or special chars';
    } else if (this.proteinDBForm.get('dbName').hasError('forbiddenName')) {
      return 'name already in use';
    }
  }

  onSubmitName(): void {
    this.dialogRef.close(this.proteinDBForm.value.dbName);

    const fileData: FileMetaData = {
      filename: this.dbFile.toString(),
      fileType: 'fasta',
      fileUUID: null,
    };

    // metadata endpoint, wait for File ID
    this.uploaderService.postObj<FileMetaData>(fileData, Endpoints.PROTEINLOADER_METADATA).subscribe(result => {
      if (result != null) {
        console.log(result.fileUUID);
        // upload fasta/xml file
        const params: HttpParams = new HttpParams();
        params.set('name', fileData.filename);
        params.set('jobid', result.fileUUID);
        this.fileUploaderService.postFileWithParams(this.dbFile, Endpoints.PROTEINLOADER_FILEUPLOAD, params).subscribe(result2 => {
          if (result2 != null) {
            console.log(result2);
            // value = result;
          }
        });
      }
    });

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onDBFileSelect(files: FileList) {
    this.dbFile = files[0];
  }
}
