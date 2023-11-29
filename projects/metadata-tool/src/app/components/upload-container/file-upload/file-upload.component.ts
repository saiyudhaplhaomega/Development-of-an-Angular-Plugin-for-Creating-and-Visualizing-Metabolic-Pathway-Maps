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
  @Input() accetpedFileRegex: AcceptedFiles;
  @Output() filesSelected = new EventEmitter<File[]>();

  isDragOver = false;
  selectedFiles: FileWithProcessedInfo[] = [];

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
  private updateFiles(newFiles: File[]) {
    const processedNewFiles = newFiles.map((file) => ({
      file: file,
      processedInfo: this.extractInfoFromFilename(file.name)
    }));

    const uniqueNewFiles = processedNewFiles.filter(
      (processedFile) =>
        !this.selectedFiles.some(
          (existingFile) =>
            existingFile.file.name === processedFile.file.name &&
            existingFile.file.size === processedFile.file.size
        )
    );

    this.selectedFiles = [...this.selectedFiles, ...uniqueNewFiles];

    console.log("Updated selected files:", this.selectedFiles);
    this.filesSelected.emit(this.selectedFiles.map((f) => f.file));
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);

      // Concatenate the new unique files to the existing selectedFiles

      this.updateFiles(newFiles);
      input.value = "";
    }
  }

  deleteFile(fileToDelete: File): void {
    this.selectedFiles = this.selectedFiles.filter(
      (fileWithInfo) => fileWithInfo.file !== fileToDelete
    );
    // If you are categorizing files, re-categorize them after deletion
  }

  private extractInfoFromFilename(fileName: string): ProcessedFileInfo {
    for (const [type, regex] of Object.entries(this.accetpedFileRegex)) {
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

  categorizedRows: RowData[] = [];

  categorizeFiles(processedNewFiles) {
    // Categorize the files into rows
    processedNewFiles.forEach((fileWithInfo) => {
      const category = fileWithInfo.processedInfo.fileCategory;

      // Find if there's already a row with this category
      let row = this.categorizedRows.find((r) => r[category] === undefined);

      if (!row) {
        row = this.initiateRow();
        this.categorizedRows.push(row);
      }

      row[category] = fileWithInfo;
    });
  }

  private initiateRow(): RowData {
    const row: RowData = {};
    Object.keys(this.accetpedFileRegex).forEach((key) => {
      row[key] = undefined;
    });
    return row;
  }
}
