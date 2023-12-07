import { Component, OnInit } from '@angular/core';
import { MetaDataService } from '../../services/metaddata-input.service';

@Component({
  selector: 'app-metadata-downloadpage',
  templateUrl: './metadata-downloadpage.component.html',
  styleUrls: ['./metadata-downloadpage.component.scss']
})
export class MetadataDownloadpageComponent {

  constructor(private dataService: MetaDataService) {}

  downloadUrls(): string[] {
    return this.dataService.getDownloads();
  }

  zipUrl(): string {
    return this.dataService.getZip();
  }

  convertUrl(url: string): string {
    let converted = "";
    converted = url.substring(url.lastIndexOf("/")+1);
    return converted;
  }


  // downloadFile() {
  //   this.MetaDataDownloadService.downloadFileFromServer().subscribe((data: any) => {
  //     const blob = new Blob([data], { type: 'application/octet-stream' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'file-name.ext';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   });
  // }

}
