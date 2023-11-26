//import { Endpoints, WebserveraddressService } from '../webserveraddress.service';
import { MetaDataService } from "../../services/metaddata-input.service";
import {
  MultiFileUploadData,
  UploadDialogComponent,
  UploadProgressService
} from "shared-lib";
import { MatDialog } from "@angular/material/dialog";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MetaDataUploadJson } from "../../model/metadatauploadjson";
import { FileMetadata } from "../../model/file-metadata";

@Component({
  selector: "app-metadata-upload-container",
  templateUrl: "./metadata-uploadpage.component.html",
  styleUrls: ["./metadata-uploadpage.component.scss"]
})
export class MetadataUploadContainerComponent implements OnInit {
  selectedFiles: File[] = [];
  selectedFiles: File[] = [];

  @Output() uploadStatusChanged = new EventEmitter<{
    progress: number;
  }>();


  model: FileMetadata;


  selectedPipeline: Pipeline;
  uploadDialogId: string;
  uploadProgress: number = 0;
  showContainer = true;
  metadataUploadJson: MetaDataUploadJson;

  constructor(
    private dataService: MetaDataService,
    private uploadProgressService: UploadProgressService,
    private dialog: MatDialog
  ) {}

  handleFileSelection(files: File[]) {
    this.selectedFiles = files;
  }

  handleFileSelection(files: File[]) {
    this.selectedFiles = files;
  }

  ngOnInit() {
    this.dataService.metadataUploadJson.subscribe((json) => {
      this.metadataUploadJson = json;
    });
    // Emit the progress
    this.uploadProgressService.currentProgress.subscribe((progress) => {
      this.uploadProgress = progress;
      this.uploadStatusChanged.emit({
        progress: this.uploadProgress
      });
    });
  }

  onUpload(): void {
    console.log('Selected Files:', this.selectedFiles); // Debugging

    // Hide certain UI elements during upload
    this.showContainer = false;

    // Set a unique identifier for this upload session
    this.uploadProgressService.setUUID("UPLOAD");

    // Prepare the metadata model based on the selected pipeline
    this.model = {
      processingPipeline: this.selectedPipeline.value,
      spectrumFile: "",
      mzidFile: "",
      psmFile: "",
      peptideFile: ""
    };

    // Log the model for debugging
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('Model from pipeline:', JSON.stringify(this.model));
    // Update the metadata with the selected pipeline information
    this.dataService.updateAllMetaDataUploadJson(this.model);

    // Prepare the files for upload
    const files: MultiFileUploadData = { files: [] };
    this.selectedFiles.forEach((file) => {
      files.files.push({ uploadFile: file, fileID: file.name });
    });

    // Upload the files
    this.dataService.upload(files, this.uploadProgressService, this.dialog);

    // Open a dialog indicating the upload has started
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: false,
      data: { successMessage: "Upload initiated." }
    });

    // Handle post-upload actions
    dialogRef.afterClosed().subscribe(/* ... */);

    // Clear the list of selected files and reset the file input
    this.selectedFiles = [];
    this.clearFileInput();
  }

  // Helper method to clear the file input
  clearFileInput(): void {
    const inputElem = document.querySelector(
      ".upload-input"
    ) as HTMLInputElement;
    if (inputElem) {
      inputElem.value = ""; // Clear the file input
    }
  }
}
