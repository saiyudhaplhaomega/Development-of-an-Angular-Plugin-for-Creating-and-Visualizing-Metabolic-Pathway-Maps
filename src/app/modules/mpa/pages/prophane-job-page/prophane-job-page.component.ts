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

  mpacsvFile: File;
  scaffoldxlsFile: File;
  generictsvFile: File;
  pdxmlFile: File;
  pdtxtFile: File;

  prophaneResults: string[];
  prophaneResult: string;
  currentProphaneParameters: ProphaneParamObject;
  prophaneJobReady: boolean;
  csvProgress: number;
  fastaProgress: number;
  fileUrl: string;
  downloadReady: boolean;

  showadvanced = false;

  jobLabel = 'Another Job';

  newGroupMember = 'group member';
  newGroupItem = {groupname: 'Default Group', groupmembers: []};
  sampleGroups: Array<Object> = [];

  taskCounter = 2;
  annotationTasks: Array<Object> =
    [{displayName: 'Annotation Task 1', scope: 'Function', type: 'emapper', evalue: '0.01', database: 'eggnog latest'},
     {displayName: 'Annotation Task 2', scope: 'Taxonomy', type: 'diamond', evalue: '0.01', database: 'ncbi_nr latest'}];

  contAccession = '';
  selectedContaminationOption;
  contaminationdata: Array<Object> = [
    {id: 0, name: 'start at accession'},
    {id: 1, name: 'end at accession'},
  ];

  selectedLevel;
  typedata: Array<Object> = [
    {id: 0, name: 'MetaProteomeAnalyzer (MPA)'},
    {id: 1, name: 'Scaffold'},
    {id: 2, name: 'Generic Input'},
    {id: 3, name: 'Proteome Discoverer'},
    ];

  selectedQuant;
  quantdata: Array<Object> = [
    {id: 0, name: 'Raw value (no normalization)'},
    {id: 1, name: 'NSAF (normalized to longest metaprotein sequence)'},
    {id: 2, name: 'NSAF (normalized to shortest metaprotein sequence)'},
    {id: 3, name: 'NSAF (normalized to mean metaprotein sequence)'},
  ];

  selectedScope;
  scopetdata: Array<Object> = [
    {id: 0, name: 'Taxonomy'},
    {id: 1, name: 'Function'},
   ];

  constructor(private uploaderService: FileUploaderService, private jsonUpload: SerializableObjectUploaderService) {
    this.prophaneJobReady = true;
    this.csvProgress = 0;
    this.fastaProgress = 0;
    this.fileUrl = 'http://129.70.51.126:9092/mpacloud/v1/prophaneDownload/';
    this.downloadReady = false;
  }

  ngOnInit() {
   /*this.prophaneResults = ['1', '2'];*/
    this.fileUrl = 'http://129.70.51.126:9092/mpacloud/v1/prophaneDownload/';
    this.selectedContaminationOption = this.contaminationdata[0];
    this.selectedQuant = this.quantdata[0];
  }

  testLog() {
    console.log(this.jobLabel);
  }

  addSampleGroup(obj) {
    this.sampleGroups.push(obj);
    this.newGroupItem = {groupname: 'Default Group', groupmembers: ['group member']};
  }

  removeSampleGroup(removeGroup) {
    this.sampleGroups = this.sampleGroups.filter(obj => obj !== removeGroup);
  }

  addNewGroupMember(newmember, group) {
    group.groupmembers.push(newmember);
    this.newGroupMember = 'group member';
  }

  removeGroupMember(removemember, group) {
    group.groupmembers = group.groupmembers.filter(obj => obj !== removemember);
  }






  toggleAdvancedOptions() {
    this.showadvanced = !this.showadvanced;
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

  requestStatus() {
    // request status
    // call service to request status json
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneParameters, 'mpacloud/v1/prophaneCheckStatus').subscribe(d => {
      if (d.status === '6') {
        this.fileUrl = this.fileUrl + ':' + d.prophaneJobUUID;
        this.downloadReady = true;
      }
    });
  }

}
