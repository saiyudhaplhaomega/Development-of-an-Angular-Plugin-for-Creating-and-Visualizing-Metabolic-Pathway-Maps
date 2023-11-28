import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

interface ProcessedFileInfo {
  fileName: string;
  batchDescription: string;
  sampleNumber: string;
  extension: string;
}

interface FileWithProcessedInfo {
  file: File;
  processedInfo: ProcessedFileInfo; // Assuming ProcessedFileInfo is defined as shown earlier
}

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent {
  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;
  @Input() acceptedDataTypes: string;
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
    // Process the new files to include the processed information
    const processedNewFiles = newFiles.map((file) => ({
      file: file,
      processedInfo: this.processFileName(file.name)
    }));

    // Filter out files that are already in the selectedFiles array
    const uniqueNewFiles = processedNewFiles.filter(
      (processedFile) =>
        !this.selectedFiles.some(
          (existingFile) =>
            existingFile.file.name === processedFile.file.name &&
            existingFile.file.size === processedFile.file.size
        )
    );

    // Concatenate the new unique files to the existing selectedFiles array
    this.selectedFiles = [...this.selectedFiles, ...uniqueNewFiles];
    console.log(
      "🚀 ~ file: file-upload.component.ts:77 ~ FileUploadComponent ~ updateFiles ~ this.selectedFiles :",
      this.selectedFiles
    );

    // Emit the updated selectedFiles array
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

  deleteFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    // Other necessary logic
  }

  private processFileName(fileName: string): ProcessedFileInfo {
    const parts = fileName.split("_");
    const extensionPart = parts.pop()?.split(".") || ["", ""];
    const batchDescription = parts[0] || "";
    const sampleNumber = extensionPart[0];
    const extension = extensionPart[1];

    return {
      fileName: fileName,
      batchDescription: batchDescription,
      sampleNumber: sampleNumber,
      extension: extension
    };
  }
}
