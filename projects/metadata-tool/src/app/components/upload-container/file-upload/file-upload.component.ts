import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @Input() acceptedDataTypes: string;
  @Output() filesSelected = new EventEmitter<File[]>();


  isDragOver = false;
  selectedFiles: File[] = [];

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
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      // Process the files as needed
      this.processFiles(this.selectedFiles);
    }
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

  deleteFile(index: number): void {
    this.selectedFiles = [
      ...this.selectedFiles.slice(0, index),
      ...this.selectedFiles.slice(index + 1),
    ];
  }

  private processFiles(files: File[]) {
    // Implement your logic to process files here
  }

  handleFileSelection(selectedFiles: File[]) {
    // Logic to handle selected files
    this.selectedFiles = selectedFiles;

    // Process the files as needed
    this.processFiles(this.selectedFiles);
  }
}
