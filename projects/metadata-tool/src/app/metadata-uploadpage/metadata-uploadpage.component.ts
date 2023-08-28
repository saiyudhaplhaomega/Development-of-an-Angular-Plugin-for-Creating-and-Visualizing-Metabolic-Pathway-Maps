
import { Component } from '@angular/core';
import { HttpClientService, MultiFileUploadData } from 'shared-lib';
import { Endpoints, WebserveraddressService } from '../webserveraddress.service';

@Component({
  selector: 'app-metadata-uploadpage',
  templateUrl: './metadata-uploadpage.component.html',
  styleUrls: ['./metadata-uploadpage.component.scss']
})
export class MetadataUploadpageComponent {
  selectedFiles: File[] = [];
  uploadProgress: number | null = null;
  uploadError: string | null = null;

  constructor(private httpClientService: HttpClientService,
    private url: WebserveraddressService) {}

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {
    //this.uploadProgress = 0;
    this.uploadError = null;
    const files: MultiFileUploadData = {
      files: [],
      fileUploadAdress: '',
    }
    this.selectedFiles.forEach((file) => {
      files.files.push({uploadFile: file, fileID: file.name});
    });
    this.httpClientService.postMultiPartFiles(files, this.url.getURL(Endpoints.UPLOAD_FILES)).subscribe(
      response => {
        console.log('Upload successful!', response);
      },
      error => {
        console.error('Upload failed :/', error);
        this.uploadError = 'Upload failed. Please try again.';
      }
    );
  }
}
