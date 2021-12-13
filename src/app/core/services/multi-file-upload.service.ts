import { Injectable } from '@angular/core';
import {AuthenticatedSerializableObjectUploaderService} from './authenticated-serializable-object-uploader.service';
import {MPAFile} from '../../prophane/objects/mpafile';
import {HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {UploadProgressService} from './upload-progress.service';
import {FileUploaderService} from './file-uploader.service';
import {Endpoints, WebserveraddressService} from './webserveraddress.service';

export interface FileUploadData {
  uploadFile: File;
  fileMetaData: {filename: string, experimentuuid: string};
  metaDataAdress: string;
  fileUploadAdress: string;
  uploadFasta?: File;
}

@Injectable({
  providedIn: 'root',
})
export class MultiFileUploadService {

  fileArray: FileUploadData[];

  constructor(
    private uploaderService: AuthenticatedSerializableObjectUploaderService,
    private dialog: MatDialog,
    private uploadProgressService: UploadProgressService,
    private fileUploaderService: FileUploaderService,
    private webserver: WebserveraddressService,
  ) {
    this.fileArray = [];
  }

  addUploadFiles(files: FileUploadData[]) {
    this.fileArray.push(...files);
  }

  addSingleUploadFile(file: FileUploadData) {
    this.fileArray.push(file);
  }

  clearUploadFiles() {
    this.fileArray = [];
  }

  performUpload() {
    for (const file of this.fileArray) {
      this.uploaderService.postObjDifferentReturnValue(file.fileMetaData, file.metaDataAdress).subscribe(result => {
        const response: MPAFile = result;
        console.log(result);

        // Upload of Peaklist/Search result files
        const fastaFileSize = file.uploadFasta ? file.uploadFasta.size : 0;
        this.uploadProgressService.addToTotal(file.uploadFile.size + fastaFileSize);

        this.fileUploaderService.postFile(file.uploadFile,
          this.webserver.getFileUploaderEndpoint(file.fileUploadAdress, response.file_UUID, response.experiment_UUID)).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgressService.changeReportLoaded(event.loaded);
              console.log(event);
            } else if (event.type === HttpEventType.Response) {
              console.log(`File ${file.uploadFile.name} uploaded`);
            }
          },
          error => {
            if (error.status === 500) {
              // handle failed upload
              if (this.dialog.getDialogById('uploadDialog')) {
                this.dialog.getDialogById('uploadDialog').componentInstance.setUploadFailed();
                this.dialog.getDialogById('uploadDialog').componentInstance.data.message = error;
              }
            } else {
              throw error;
            }
          }
        );

        // TODO: file type isn't important
        // Upload of FASTA if present
        if (file.uploadFasta) {
          this.fileUploaderService.postFile(file.uploadFasta,
            this.webserver.getFileUploaderEndpoint(Endpoints.UPLOAD_FASTA, response.file_UUID, response.experiment_UUID)).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.uploadProgressService.changeFastaLoaded(event.loaded);
              } else if (event.type === HttpEventType.Response) {
              }
            },
            error => {
              if (error.status === 500) {
                // handle failed upload
                if (this.dialog.getDialogById('uploadDialog')) {
                  this.dialog.getDialogById('uploadDialog').componentInstance.setUploadFailed();
                }
              } else {
                throw error;
              }
            }
          );
        }
      });
    }
    }

}
