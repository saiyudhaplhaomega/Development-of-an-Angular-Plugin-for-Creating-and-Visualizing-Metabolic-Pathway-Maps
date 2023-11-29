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
<<<<<<< HEAD
import { FileMetadata } from "../../model/file-metadata";
import { pipelineData } from "./pipeline.data";
=======
>>>>>>> 0fcc351 (try to fix metadata file type)

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

<<<<<<< HEAD
  model: FileMetadata;

  pipelines: Pipeline[] = pipelineData;
=======
  pipelines: Pipeline[] = [
    {
      value: "generic_mzid_mzml",
      viewValue: "Generic (mzid+mzml)",
      acceptedDataTypes: [".mzid", ".mzml"],
      matchingFilesReges: {
        spectra: "(.*)_(.*).mgf$",
        Peptide: "Peptides_(.*)_(.*).csv$",
        PSM: "PSMs_(.*)_(.*).csv$"
      }
    },
    {
      value: "metaproteomeanalyzer",
      viewValue: "MetaProteomeAnalyzer",
      acceptedDataTypes: [".mgf", ".csv"],
      matchingFilesReges: {
        spectra: "(.*)_(.*).mgf$",
        Peptide: "Peptides_(.*)_(.*).csv$",
        PSM: "PSMs_(.*)_(.*).csv$"
      }
    }
    // {
    //   value: "proteomediscoverer",
    //   viewValue: "ProteomeDiscoverer",
    //   acceptedDataTypes: [".mgf", ".csv"],
    //   matchingFilesReges: {
    //    spectra: ".*_MixA\.mgf$",
    //     Peptide: "Peptides_.*_MixA\.csv$",
    //     PSM: "PSMs_.*_MixA\.csv$"
    //   }
    // },
    // {
    //   value: "generic_mgf_mzid",
    //   viewValue: "Generic (mgf+mzid)",
    //   acceptedDataTypes: [".mgf", ".mzid"],
    //   matchingFilesReges: {
    //     spectra: ".*_MixA\.mgf$",
    //     Peptide: "Peptides_.*_MixA\.csv$",
    //     PSM: "PSMs_.*_MixA\.csv$"
    //   }
    // }
  ];
>>>>>>> 0fcc351 (try to fix metadata file type)

  selectedPipeline: Pipeline = this.pipelines[1];
  uploadDialogId: string;
  uploadProgress = 0;
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
    console.log("Selected Files:", this.selectedFiles); // Debugging

    // Hide certain UI elements during upload
    this.showContainer = false;

    // Set a unique identifier for this upload session
    this.uploadProgressService.setUUID("UPLOAD");

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
    // Update the metadata with the selected pipeline information
    this.dataService.updateAllMetaDataUploadJson({
      processingPipeline: this.selectedPipeline.value
    });

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
