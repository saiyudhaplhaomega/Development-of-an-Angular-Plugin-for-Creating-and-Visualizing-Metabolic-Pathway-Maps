
//import { Endpoints, WebserveraddressService } from '../webserveraddress.service';
import { MetaDataInputService } from '../../pages/metadata-workflow-page/metaddata-input.service';
import { MultiFileUploadData, UploadDialogComponent, UploadProgressService } from 'shared-lib';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-metadata-upload-container',
  templateUrl: './metadata-uploadpage.component.html',
  styleUrls: ['./metadata-uploadpage.component.scss'],
})
export class MetadataUploadContainerComponent implements OnInit {
  @Output() uploadStatusChanged = new EventEmitter<{
    progress: number;
    started: boolean;
  }>();

  pipelines = [
    { value: 'generic_mzid_mzml', viewValue: 'Generic (mzid+mzml)' },
    { value: 'metaproteomeanalyzer', viewValue: 'MetaProteomeAnalyzer' },
    { value: 'proteomediscoverer', viewValue: 'ProteomeDiscoverer' },
    { value: 'generic_mgf_mzid', viewValue: 'Generic (mgf+mzid)' },
  ];

  selectedPipeline;
  '';
  selectedFiles: File[] = [];
  uploadDialogId: string;

  // While uploading files
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
    // Emit the progress
    this.uploadProgressService.currentProgress.subscribe((progress) => {
      this.uploadProgress = progress;
      this.uploadStatusChanged.emit({
        progress: this.uploadProgress,
        started: this.uploadProgress > 0,
      });
    });
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);

      // Add only new files to the selectedFiles array
      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !this.selectedFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );

      // Concatenate the new unique files to the existing selectedFiles
      this.selectedFiles = [...this.selectedFiles, ...uniqueNewFiles];

      // After adding files, you might want to reset the input
      input.value = '';
    }
  }

  onUpload(): void {
    this.uploadStartTime = Date.now();
    this.uploadProgressService.currentProgress.subscribe((progress) => {
      this.uploadProgress = progress;
      if (progress > 0) {
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

    this.selectedFiles = []; // Clear the list of selected files
    this.clearFileInput(); // Clear the file input in the UI
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
    this.selectedFiles = [
      ...this.selectedFiles.slice(0, index),
      ...this.selectedFiles.slice(index + 1),
    ];
  }
  clearFileInput(): void {
    const inputElem = document.querySelector(
      '.upload-input'
    ) as HTMLInputElement;
    if (inputElem) {
      inputElem.value = ''; // This will clear the file input in the UI
    }
  }

  showTooltip(progressBar: any): void {
    progressBar.tooltip.toggle(); // Shows the tooltip
  }

  hideTooltip(progressBar: any): void {
    progressBar.tooltip.hide(); // Hides the tooltip
  }
}
