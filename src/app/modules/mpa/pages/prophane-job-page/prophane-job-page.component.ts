import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../../../shared/services/file-uploader.service';
import { MatRadioChange } from '@angular/material/radio';
import { SerializableObjectUploaderService } from '../../../../shared/services/serializable-object-uploader.service';
import { ProphaneParamObject, ProphaneParamJSON } from '../../../../core/models/prophaneparamjson';
import { HttpEventType } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane-job-page.component.html',
  styleUrls: ['./prophane-job-page.component.css']
})
export class ProphaneJobPageComponent implements OnInit {

  fastaFile: File;
  csvFile: File;
  prophaneResults: string[];
  prophaneResult: string;
  currentProphaneParameters: ProphaneParamObject;
  prophaneJobReady: boolean;
  csvProgress: number;
  fastaProgress: number;

  constructor(private uploaderService: FileUploaderService, private jsonUpload: SerializableObjectUploaderService) {
    this.prophaneJobReady = true;
    this.csvProgress = 0;
    this.fastaProgress = 0;
  }

  ngOnInit() {
    this.prophaneResults = ['1', '2'];
  }

  onChange(mrChange: MatRadioChange) {
    this.prophaneResult = mrChange.source.value;
    console.log(this.prophaneResult);
  }

  uploadFasta(): void {
    console.log(this.fastaFile);
    if (this.fastaFile) {
      this.uploaderService.postFile(this.fastaFile,
        'mpacloud/v1/prophaneFasta' + '?name=' + this.currentProphaneParameters.prophaneJobUUID).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.fastaProgress = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              let response: any;
              response = event.body;
              this.fastaProgress = 0;
              console.log('Response:' + response);
            }
          }
      );
    }
  }

  uploadCSV(): void {
    console.log(this.csvFile);
    if (this.csvFile) {
      this.uploaderService.postFile(this.csvFile,
        'mpacloud/v1/prophaneCSV' + '?name=' + this.currentProphaneParameters.prophaneJobUUID).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.csvProgress = Math.round((event.loaded / event.total) * 100);
            } else if (event.type === HttpEventType.Response) {
              let response: any;
              response = event.body;
              this.csvProgress = 0;
              console.log('Response:' + response);
            }
          }
      );
    }
  }

  startProphaneJob(): void {
    console.log(this.currentProphaneParameters);
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneParameters, 'mpacloud/v1/prophaneStartJob').subscribe(d => {
      console.log(d);
    });
  }

  requestNewJob(): void {
    this.currentProphaneParameters = new ProphaneParamObject();
    this.currentProphaneParameters.prophaneJobUUID = '';
    this.currentProphaneParameters.csvFilename = this.csvFile.name;
    this.currentProphaneParameters.fastaFilename = this.fastaFile.name;
    console.log(this.currentProphaneParameters);
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneParameters, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
      this.currentProphaneParameters = res;
      this.prophaneJobReady = !(this.currentProphaneParameters.prophaneJobUUID.length > 0);
      console.log(this.currentProphaneParameters);
    });
  }

  startButton(): void {
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
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
