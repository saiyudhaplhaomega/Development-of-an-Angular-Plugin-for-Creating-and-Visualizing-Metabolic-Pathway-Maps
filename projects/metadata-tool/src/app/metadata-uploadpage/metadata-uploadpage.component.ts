import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { MetaDataUploadService } from './metaddata-upload.service';

@Component({
  selector: 'app-metadata-uploadpage',
  templateUrl: './metadata-uploadpage.component.html',
  styleUrls: ['./metadata-uploadpage.component.scss']
})
export class MetadataUploadpageComponent {
  selectedFiles: File[] = [];
  uploadProgress: number | null = null;
  uploadError: string | null = null;

  constructor(private MetaDataUploadService: MetaDataUploadService) {}

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {
    this.uploadProgress = 0;
    this.uploadError = null;

    this.selectedFiles.forEach((file, index) => {
      this.MetaDataUploadService.uploadFile(file).subscribe(
        response => {
          console.log(`Upload successful for file ${index + 1}`, response);
          this.uploadProgress = ((index + 1) / this.selectedFiles.length) * 100;
        },
        error => {
          console.error(`Upload failed for file ${index + 1}`, error);
          this.uploadError = 'Upload failed. Please try again.';
        }
      );
    });
  }
}