
import { Component } from '@angular/core';
//import { Endpoints, WebserveraddressService } from '../webserveraddress.service';
import { MetaDataInputService } from '../../pages/metadata-workflow-page/metaddata-input.service';
import { MultiFileUploadData, UploadDialogComponent, UploadProgressService } from 'shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-upload-container',
  templateUrl: './metadata-uploadpage.component.html',
  styleUrls: ['./metadata-uploadpage.component.scss'],
})
export class MetadataUploadContainerComponent implements OnInit {
  selectedFiles: File[] = [];
  uploadDialogId: string;
  uploadProgress: number = 0; // Added property for tracking upload progress

  constructor(
    private dataService: MetaDataInputService,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataService.metadataUploadJson.subscribe();
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {
    this.uploadProgressService.reset();
    this.uploadProgressService.setUUID('UPLOAD');
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: true,
      data: { successMessage: 'Upload successful.' },
    });

    const files: MultiFileUploadData = {
      files: this.selectedFiles.map((file) => ({
        uploadFile: file,
        fileID: file.name,
      })),
    };

  this.dataService
    .upload(files, this.uploadProgressService, this.dialog)
    .subscribe(
      (progress) => {
        this.uploadProgress = progress;
      },
      (error) => {
        console.error('Upload error:', error);
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // Navigation or other logic after dialog closes
    });
  }
}
