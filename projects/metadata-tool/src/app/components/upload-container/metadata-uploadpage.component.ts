
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

  uploadProgress: number = 0;
  uploadStartTime: number;
  timeRemaining: string = ''; // This will hold the time remaining as a string

  showContainer = true;

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
    this.uploadStartTime = Date.now();
    this.uploadProgressService.currentProgress.subscribe((progress) => {
      this.uploadProgress = progress;
      if (progress < 100 && progress > 0) {
        this.showContainer = false;
      }

      this.calculateTimeRemaining();
    });

    this.uploadProgressService.reset();

    this.uploadProgressService.setUUID('UPLOAD');
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: false,
      data: { successMessage: 'Upload successful.' },
    });
    const onDialogClosingObservable = dialogRef.afterClosed();
    const files: MultiFileUploadData = {
      files: [],
    };
    this.selectedFiles.forEach((file) => {
      files.files.push({ uploadFile: file, fileID: file.name });
    });
    for (let file of files.files) {
      this.uploadProgressService.addToTotal(file.uploadFile.size);
    }
    this.dataService.upload(files, this.uploadProgressService, this.dialog);
    //onDialogClosingObservable(this.router.navigate());
  }

  private calculateTimeRemaining(): void {
    if (this.uploadProgress > 0) {
      const timeElapsed = Date.now() - this.uploadStartTime;
      const totalEstimatedTime = timeElapsed / (this.uploadProgress / 100);
      const remainingTime = totalEstimatedTime - timeElapsed;
      this.timeRemaining = this.formatTime(remainingTime);
    }
  }

  private formatTime(milliseconds: number): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes} min ${seconds} sec`;
  }
  deleteFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}
