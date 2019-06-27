import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../../../shared/services/file-uploader.service';

@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane-job-page.component.html',
  styleUrls: ['./prophane-job-page.component.css']
})
export class ProphaneJobPageComponent implements OnInit {

  fastaFile: File;
  csvFile: File;
  prophaneResults: String[];
  prophaneResult: String;

  constructor(private uploaderService: FileUploaderService) { }

  ngOnInit() {
  }

  uploadFasta(): void {
    console.log(this.fastaFile);
    if (this.fastaFile) {
      this.uploaderService.postFile(this.fastaFile, 'mpacloud/v1/prophaneFasta').subscribe(d => {
        console.log(d);
      });
    }
  }

  uploadCSV(): void {
    console.log(this.csvFile);
    if (this.csvFile) {
      this.uploaderService.postFile(this.csvFile, 'mpacloud/v1/prophaneCSV').subscribe(d => {
        console.log(d);
      });
    }
  }

  uploadFiles(): void {
    this.uploadCSV();
    this.uploadFasta();
  }

  getProphaneResults(): void {
    this.prophaneResults = ['1', '2'];
  }

  onFastaChange(files: FileList) {
    this.fastaFile = files[0];
  }

  onCSVChange(files: FileList) {
    this.csvFile = files[0];
  }

}
