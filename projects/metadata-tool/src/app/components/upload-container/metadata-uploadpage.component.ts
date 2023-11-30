//import { Endpoints, WebserveraddressService } from '../webserveraddress.service';
import { MetaDataService } from "../../services/metaddata-input.service";
import {
  MultiFileUploadData,
  UploadDialogComponent,
  UploadFile,
  UploadProgressService
} from "shared-lib";
import { MatDialog } from "@angular/material/dialog";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MetaDataUploadJson } from "../../model/metadatauploadjson";

import { pipelineData } from "./pipeline.data";
import { MetadataJson, MetadataJsonObject } from "../../model/metadata-columnData";

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

  model;

  pipelines: Pipeline[] = pipelineData;
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

  handleFileSelection(files: FileWithProcessedInfo[]) {
    console.log("this.handleFileSelection");
    // handle the actual files
    this.selectedFiles = files.map((f) => f.file);
    // we get all files each time, so we reset the table and map again
    this.metadataUploadJson.metadataJson = [];
    const rowMapping = new Map<string, MetadataJson>();
    files.forEach( (f: FileWithProcessedInfo) => {
      if (rowMapping.has(f.processedInfo.sampleNumber)) {
        const existingRow: MetadataJson = rowMapping.get(f.processedInfo.sampleNumber);
        if (f.processedInfo.fileCategory == 'PSM') {
          existingRow.psmFile = f.processedInfo.id;
        } else if (f.processedInfo.fileCategory == 'peptide') {
          existingRow.peptideFile = f.processedInfo.id;
        } else if (f.processedInfo.fileCategory == 'spectra') {
          existingRow.spectrumFile = f.processedInfo.id;
        }
      } else {
        const newRow: MetadataJson = new MetadataJsonObject();
        console.log(newRow);
        if (f.processedInfo.fileCategory == 'PSM') {
          newRow.psmFile = f.processedInfo.id;
        } else if (f.processedInfo.fileCategory == 'peptide') {
          newRow.peptideFile = f.processedInfo.id;
        } else if (f.processedInfo.fileCategory == 'spectra') {
          newRow.spectrumFile = f.processedInfo.id;
        }
        rowMapping.set(f.processedInfo.sampleNumber, newRow);
      }
    });
    rowMapping.forEach( (row) => {
      this.metadataUploadJson.metadataJson.push(row);
    });
    // push changes to service
    this.dataService.metadataUploadJson.next(this.metadataUploadJson);
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

    // multifile object
    const files: MultiFileUploadData = { files: [] };

    // TODO: add actual file data
    this.metadataUploadJson.processingPipeline = this.selectedPipeline.value;
    this.metadataUploadJson.metadataJson.forEach( (col) => {
      col.ontId2EnabledArray = Array.from(col.ontId2Enabled);
      col.ontIdParamArray = Array.from(col.ontId2Param);
    });
    this.dataService.metadataUploadJson.next(this.metadataUploadJson);

    // this.dataService.updateAllMetaDataUploadJson({
    //   processingPipeline: this.selectedPipeline.value
    // });

    // prepare metadatajson for upload
    const metadataJsonAsFile: File = new File([JSON.stringify(this.metadataUploadJson)], 'jobObject');

    files.files.push({uploadFile: metadataJsonAsFile, fileID: 'jobObject'});

    // Prepare the data files for upload
    this.selectedFiles.forEach((file) => {
      files.files.push({ uploadFile: file, fileID: file.name });
    });

    // Upload the files
    this.dataService.upload(files, this.uploadProgressService, this.dialog);


    // no dialog for now
    // Open a dialog indicating the upload has started
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: false,
      data: { successMessage: "Upload initiated." }
    });

    // Handle post-upload actions
    // dialogRef.afterClosed().subscribe(/* ... */);
    // Update the metadata with the selected pipeline information


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
