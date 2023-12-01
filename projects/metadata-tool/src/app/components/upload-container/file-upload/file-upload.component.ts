import {
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"]
})
export class FileUploadComponent {
  // Delete files by selecting them
  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (
      (event.key === "Delete" || event.key === "Backspace") &&
      this.selectedFileIds.size > 0
    ) {
      this.deleteSelectedFiles();
    }
  }

  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement>;

  @Input() acceptedDataTypes: string[];
  @Input() acceptedFileRegex: AcceptedFiles;
  @Output() filesSelected = new EventEmitter<FileWithProcessedInfo[]>();
  @Output() uploadTriggered = new EventEmitter<boolean>();

  isDragOver = false;
  selectedFiles: FileWithProcessedInfo[] = [];
  selectedFileIds: Set<string> = new Set();
  missingFiles = true;
  categorizedRows: RowData[] = [];

  ngOnChanges(changes: SimpleChanges) {
    // Check if 'acceptedDataTypes' or 'acceptedFileRegex' have changed
    if (changes.acceptedDataTypes || changes.acceptedFileRegex) {
      // Recategorize files if there are any selected files
      if (this.selectedFiles.length > 0) {
        this.updateFiles([]);
      }
    }
  }

  onUploadClick(): void {
    this.uploadTriggered.emit(true);
  }

  // Drag and Drop behaviour
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

  // Data flow of files
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
    this.categorizeFiles(this.selectedFiles);

    console.log("Updated selected files:", this.selectedFiles);

    // display modal
    console.log("Non-matching files:", nonMatchingFiles);
    if (nonMatchingFiles.length > 0) {
      // Create a message string listing the non-matching files
      const message = nonMatchingFiles.map((file) => file.name).join(",\n");
      alert(
        "These files do not have a matching pattern for the selected pipeline: \n" +
          message +
          "."
      );
    }
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
          id: fileName,
          batchDescription: sampleName, // TODO: Assuming this is the correct interpretation --> actually no, the "groupKey" is what we need
          // TODO: if this is changed, there needs to be a change in categorizeFiles and in uploadpage-component handleFileSelection()
          sampleNumber: sampleBatch, // --> chnaged to be "groupKey" as in line 168
          fileCategory: type as keyof AcceptedFiles
        };
      }
    }
    // Return a default object if no match is found
    throw new Error(`No matching pattern found for file: ${fileName}`);
  }

  // Categorize files into rows
  private categorizeFiles(processedFiles: FileWithProcessedInfo[]) {
    const groupedFiles = processedFiles.reduce((acc, fileWithInfo) => {
      const { batchDescription, sampleNumber } = fileWithInfo.processedInfo;
      const groupKey = `${batchDescription}_${sampleNumber}`;

      if (!acc[groupKey]) {
        acc[groupKey] = this.initiateRow();
      }

      acc[groupKey][fileWithInfo.processedInfo.fileCategory] = fileWithInfo;

      return acc;
    }, {});

    this.categorizedRows = Object.values(groupedFiles);

    console.log("Categorized rows:", this.categorizedRows); // Debugging

    // Collect files from categorizedRows to emit
    const filesToShow: FileWithProcessedInfo[] = this.categorizedRows.flatMap(
      (row) =>
        Object.values(row).filter(
          (fileInfo) => fileInfo
        ) as FileWithProcessedInfo[]
    );

    const requiredFileCategories = Object.keys(this.acceptedFileRegex);

    // Check if all required file categories are present in at least one row
    // Check if all required file categories are present in every row
    this.missingFiles = !this.categorizedRows.every((row) => {
      return requiredFileCategories.every(
        (category) => row.hasOwnProperty(category) && row[category] != null
      );
    });

    this.filesSelected.emit(filesToShow); // Emitting filesToShow instead of processedFiles
  }

  // Populate a single row with all possible file categories set to undefined initially
  private initiateRow(): RowData {
    const row: RowData = {};
    for (const key of Object.keys(this.acceptedFileRegex)) {
      row[key as keyof AcceptedFiles] = undefined;
    }
    return row;
  }

  selectedFileIndices: Set<number> = new Set();

  toggleFileSelection(fileId: string, event: MouseEvent): void {
    if (event.ctrlKey) {
      if (this.selectedFileIds.has(fileId)) {
        this.selectedFileIds.delete(fileId);
      } else {
        this.selectedFileIds.add(fileId);
      }
    } else {
      this.selectedFileIds.clear();
      this.selectedFileIds.add(fileId);
    }
  }

  deleteSelectedFiles(): void {
    this.selectedFiles = this.selectedFiles.filter(
      (fileWithInfo) => !this.selectedFileIds.has(fileWithInfo.processedInfo.id)
    );
    this.categorizeFiles(this.selectedFiles);
    this.selectedFileIds.clear();
  }

  // helper Funtion
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
