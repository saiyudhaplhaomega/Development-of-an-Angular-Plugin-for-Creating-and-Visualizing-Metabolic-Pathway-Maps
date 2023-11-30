import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent {
  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;
  @Input() acceptedDataTypes: string[];
  @Input() acceptedFileRegex: AcceptedFiles;
  @Output() filesSelected = new EventEmitter<File[]>();

  isDragOver = false;
  selectedFiles: FileWithProcessedInfo[] = [];
  categorizedRows: RowData[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (event.dataTransfer && event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      this.updateFiles(newFiles);
    }
  }
  private updateFiles(newFiles: File[]): void {
    const processedNewFiles: FileWithProcessedInfo[] = [];
    const nonMatchingFiles: File[] = [];

    newFiles.forEach((file) => {
      try {
        const processedInfo = this.extractInfoFromFilename(file.name);
        processedNewFiles.push({ file, processedInfo });
      } catch (error) {
        console.error(
          `Error processing file: ${file.name}. Error: ${error.message}`
        );
        nonMatchingFiles.push(file);
      }
    });

    const uniqueNewFiles = processedNewFiles.filter(
      (processedFile) =>
        !this.selectedFiles.some(
          (existingFile) =>
            existingFile.file.name === processedFile.file.name &&
            existingFile.file.size === processedFile.file.size
        )
    );

    this.selectedFiles = [...this.selectedFiles, ...uniqueNewFiles];

    // Categorize the files
    this.categorizeFiles(uniqueNewFiles);

    console.log("Updated selected files:", this.selectedFiles);
    console.log("Non-matching files:", nonMatchingFiles);

    this.filesSelected.emit(this.selectedFiles.map((f) => f.file));
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.updateFiles(newFiles);
      input.value = "";
    }
  }

  deleteFile(fileToDelete: File): void {
    this.selectedFiles = this.selectedFiles.filter(
      (fileWithInfo) => fileWithInfo.file !== fileToDelete
    );

    // Re-categorize files after deletion
    this.categorizeFiles(this.selectedFiles);
  }

  private extractInfoFromFilename(fileName: string): ProcessedFileInfo {
    for (const [type, regex] of Object.entries(this.acceptedFileRegex)) {
      const matches = fileName.match(regex);
      if (matches && matches.length >= 3) {
        const sampleBatch = matches[1];
        const sampleName = matches[2];

        return {
          batchDescription: sampleName, // Assuming this is the correct interpretation
          sampleNumber: sampleBatch, // Adjust these as per your requirement\
          fileCategory: type as keyof AcceptedFiles
        };
      }
    }
    // Return a default object if no match is found
    throw new Error(`No matching pattern found for file: ${fileName}`);
  }

  // Categorize files into rows
  private categorizeFiles(processedFiles: FileWithProcessedInfo[]) {
    this.categorizedRows = [];

    for (const fileWithInfo of processedFiles) {
      // Find a row where the file category is not yet populated
      let row = this.categorizedRows.find(
        (r) => !r[fileWithInfo.processedInfo.fileCategory]
      );

      if (!row) {
        row = this.initiateRow();
        this.categorizedRows.push(row);
      }

      row[fileWithInfo.processedInfo.fileCategory] = fileWithInfo;
    }
  }

  // Populate a single row with all possible file categories set to undefined initially
  private initiateRow(): RowData {
    const row: RowData = {};
    for (const key of Object.keys(this.acceptedFileRegex)) {
      row[key as keyof AcceptedFiles] = undefined;
    }
    return row;
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
