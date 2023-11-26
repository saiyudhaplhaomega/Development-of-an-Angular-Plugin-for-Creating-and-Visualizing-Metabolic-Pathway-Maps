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

  @Output() uploadStatusChanged = new EventEmitter<{
    progress: number;
  }>();


  model: FileMetadata;

<<<<<<< HEAD
  pipelines: Pipeline[] = [
    {
      value: "generic_mzid_mzml",
      viewValue: "Generic (mzid+mzml)",
      acceptedDataTypes: ".mzid , .mzml",
      acceptedDataTypesRegex: "\\.mzid|\\.mzml",
      matchingFiles: {}
    },
    {
      value: "metaproteomeanalyzer",
      viewValue: "MetaProteomeAnalyzer",
      acceptedDataTypes: ".mgf , .csv",
      acceptedDataTypesRegex: "\\.mgf|\\.csv",
      matchingFiles: {
        spectra: "*_MixA.mgf",
        Peptide: "Peptides_*_MixA.mgf",
        PSM: "PSMs_*_MixA.csv"
      }
    },
    {
      value: "proteomediscoverer",
      viewValue: "ProteomeDiscoverer",
      acceptedDataTypes: ".mgf , .csv",
      acceptedDataTypesRegex: "\\.mgf|\\.csv",
      matchingFiles: {
        spectra: "Fisdljsd.mgf",
        Peptide: "Fisdljsd.mgf",
        PSM: "PSMs_Fisdljsd.csv"
      }
    },
    {
      value: "generic_mgf_mzid",
      viewValue: "Generic (mgf+mzid)",
      acceptedDataTypes: ".mgf , .mzid",
      acceptedDataTypesRegex: "\\.mgf|\\.mzid",
      matchingFiles: {}
    }
  ];
=======
>>>>>>> 41f5c08 (refactor)

  selectedPipeline: Pipeline;
  uploadDialogId: string;
<<<<<<< HEAD
<<<<<<< HEAD

  // While uploading files
  uploadProgress: number = 0;
  uploadStartTime: number;
  timeRemaining: string = ''; // This will hold the time remaining as a string
=======
  uploadProgress = 0;
>>>>>>> a372259 (added html to prettier)
=======
  uploadProgress: number = 0;
>>>>>>> 41f5c08 (refactor)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    console.log("Selected Files:", this.selectedFiles); // Debugging

>>>>>>> a372259 (added html to prettier)
=======
    console.log('Selected Files:', this.selectedFiles); // Debugging

>>>>>>> 41f5c08 (refactor)
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
    console.log('Model from pipeline:', JSON.stringify(this.model));
<<<<<<< HEAD

=======
    console.log("Model from pipeline:", JSON.stringify(this.model));
>>>>>>> a372259 (added html to prettier)
=======
>>>>>>> 41f5c08 (refactor)
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
