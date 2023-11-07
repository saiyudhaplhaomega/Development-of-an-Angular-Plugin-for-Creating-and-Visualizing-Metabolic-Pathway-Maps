
import { Component } from '@angular/core';
//import { Endpoints, WebserveraddressService } from '../webserveraddress.service';
import { MetaDataInputService } from '../metadata-workflow/metaddata-input.service';
import { MultiFileUploadData, UploadDialogComponent, UploadProgressService } from 'shared-lib';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-uploadpage',
  templateUrl: './metadata-uploadpage.component.html',
  styleUrls: ['./metadata-uploadpage.component.scss']
})
export class MetadataUploadpageComponent implements OnInit  {

  selectedFiles: File[] = [];
  uploadDialogId: string;

  constructor(private dataService: MetaDataInputService, private uploadProgressService: UploadProgressService, private dialog: MatDialog ) {}

  ngOnInit() {
    this.dataService.metadataUploadJson.subscribe();
  }

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload(): void {

    this.uploadProgressService.reset();

    this.uploadProgressService.setUUID("UPLOAD");
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      id: this.uploadDialogId,
      disableClose: true,
      data: { successMessage: 'Upload successful.' },
    });
    const onDialogClosingObservable = dialogRef.afterClosed();
    const files: MultiFileUploadData = {
      files: [],
    };
    this.selectedFiles.forEach((file) => {
      files.files.push({ uploadFile: file, fileID: file.name });
    });
    for (let file of files.files) {
      this.uploadProgressService.addToTotal(
       file.uploadFile.size
      );
    }
    this.dataService.upload(files, this.uploadProgressService, this.dialog);
    //onDialogClosingObservable(this.router.navigate());
  }



}
