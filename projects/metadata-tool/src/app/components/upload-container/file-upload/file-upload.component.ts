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
      this.updateFiles(newFiles);
    }
  }

  private updateFiles(newFiles: File[]) {
    // Add only new files to the selectedFiles array
    const uniqueNewFiles = newFiles.filter(
      (newFile) =>
        !this.selectedFiles.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
    );

    this.selectedFiles = [...this.selectedFiles, ...uniqueNewFiles];
    // Emit, if files are changing
    this.filesSelected.emit(this.selectedFiles);
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      // Add only new files to the selectedFiles array
      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !this.selectedFiles.some(
            (existingFile) =>
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );
=======

>>>>>>> 41f5c08 (refactor)

=======
>>>>>>> 55380e6 (bugfix)
=======
>>>>>>> 55380e6 (bugfix)
      // Concatenate the new unique files to the existing selectedFiles

      this.updateFiles(newFiles);
      input.value = '';
    }
  }

  deleteFile(index: number): void {
    this.selectedFiles = [
      ...this.selectedFiles.slice(0, index),
      ...this.selectedFiles.slice(index + 1),
    ];
  }

  matchFiles(){

  }
}
