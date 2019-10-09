import { Component, OnInit } from '@angular/core';
import { FileUploaderService } from '../../../../shared/services/file-uploader.service';
import { MatRadioChange } from '@angular/material/radio';
import { SerializableObjectUploaderService } from '../../../../shared/services/serializable-object-uploader.service';
import { ProphaneParamObject, ProphaneParamJSON } from '../../../../core/models/prophaneparamjson';
import { HttpEventType } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {forEach} from '@angular/router/src/utils/collection';
import {ProphaneAnnotationTaskObject} from '../../../../core/models/prophaneannotationtaskjson';
import {ProphaneSampleGroupJSON} from '../../../../core/models/prophanesamplegroupjson';




@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane-job-page.component.html',
  styleUrls: ['./prophane-job-page.component.css']
})
export class ProphaneJobPageComponent implements OnInit {

  fastaFile: File;

  proteinReportFile: File;

  prophaneResults: string[];
  prophaneResult: string;
  currentProphaneParameters: ProphaneParamObject;
  prophaneJobReady: boolean;
  csvProgress: number;
  fastaProgress: number;
  fileUrl: string;
  downloadReady: boolean;

  // Main options

  selectedLevel;
  typedata: Array<Object> = [
    {id: 0, name: 'MetaProteomeAnalyzer (MPA)'},
    {id: 1, name: 'Scaffold'},
    {id: 2, name: 'Generic Input'},
    // {id: 3, name: 'Proteome Discoverer'}
  ];

  contAccession = '';
  selectedContaminationOption;
  contaminationdata: Array<Object> = [
    {id: 0, name: 'start at accession'},
    {id: 1, name: 'end at accession'},
  ];

  showadvanced = false;


  // Advanced Options

  jobLabel = 'Another Job';
  selectedQuant;
  quantdata: object[] = [
    {id: 0, name: 'Raw value (no normalization)'},
    {id: 1, name: 'NSAF (normalized to longest metaprotein sequence)'},
    {id: 2, name: 'NSAF (normalized to shortest metaprotein sequence)'},
    {id: 3, name: 'NSAF (normalized to mean metaprotein sequence)'},
  ];

  scopetdata: object[] = [
    {id: 0, name: 'Taxonomy'},
    {id: 1, name: 'Function'},
  ];

  databaseOptions: object[] = [
    {id: 0, scope: 'Function', name: 'hmmscan'},
    {id: 1, scope: 'Function', name: 'hmmsearch'},
    {id: 2, scope: 'Function', name: 'emapper'},
    {id: 3, scope: 'Taxonomy', name: 'diamond blastp'},
  ];

  sampleGroups: ProphaneSampleGroupJSON[] = [];
  newGroupMember = 'new group member';
  newGroupItem = {groupname: 'Default Group', groupmembers: []};

  annotationTasks: ProphaneAnnotationTaskObject[] =
    [{scope: 'Function', database: 'emapper', databaseversion: 'latest',
      optionstring: '-m diamond', evalue: '0.01', tasklabel: 'task 1'},
      {scope: 'Taxonomy', database: 'diamond blastp', databaseversion: 'latest',
        optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'task 2'}];

  taskCounter = 3;
  newAnnotationTask = {scope: 'Taxonomy', database: 'diamond blastp',
    databaseversion: 'latest', optionstring: '--more-sensitive', evalue: '0.01', tasklabel: ''};
  // defaultAnnotationTask = ;

  evalueOptions: object[] = [
    {id: 0, numerical: '0.01', text: 'Relaxed'},
    {id: 1, numerical: '0.001', text: 'Mid-Range'},
    {id: 2, numerical: '0.0005', text: 'Strict'}
  ];

  setDefaultOptionString(event, task) {
    switch (event.value) {
      case 'hmmscan': {
        task.optionstring = '--cut_tc';
        break;
      }
      case 'hmmsearch' : {
        task.optionstring = '--cut_tc';
        break;
      }
      case 'emapper' : {
        task.optionstring = '-m diamond';
        break;
      }
      case 'diamond blastp' : {
        task.optionstring = '--more-sensitive';
        break;
      }
      default : {
        console.log('F**K');
      }
    }
  }

  constructor(private uploaderService: FileUploaderService, private jsonUpload: SerializableObjectUploaderService) {
    this.prophaneJobReady = true;
    this.csvProgress = 0;
    this.fastaProgress = 0;
    this.fileUrl = 'http://129.70.51.126:9091/mpacloud/v1/prophaneDownload/';
    this.downloadReady = false;
  }

  ngOnInit() {
    /*this.prophaneResults = ['1', '2'];*/
    this.fileUrl = 'http://129.70.51.126:9091/mpacloud/v1/prophaneDownload/';
    this.selectedContaminationOption = this.contaminationdata[0];
    this.selectedQuant = this.quantdata[0];
  }

  addSampleGroup() {
    this.sampleGroups.push(this.newGroupItem);
    this.newGroupItem = {groupname: 'Default Group', groupmembers: []};
  }
  removeSampleGroup(removeGroup) {
    this.sampleGroups = this.sampleGroups.filter(obj => obj !== removeGroup);
  }
  addNewGroupMember(newmember, group) {
    if (!group.groupmembers.includes(newmember)) {
      group.groupmembers.push(newmember);
    }
    this.newGroupMember = 'group member';
  }
  removeGroupMember(removemember, group) {
    group.groupmembers = group.groupmembers.filter(obj => obj !== removemember);
  }



  addAnnotationTask() {
    this.annotationTasks.push(this.newAnnotationTask);
    this.taskCounter++;
    this.newAnnotationTask = {scope: 'Taxonomy', database: 'diamond blastp', databaseversion: 'latest', optionstring: '--more-sensitive', evalue: '0.01', tasklabel: ''};
  }

  removeAnnotationTask(removeTask) {
    this.annotationTasks = this.annotationTasks.filter(obj => obj !== removeTask);
    this.taskCounter--;
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
    console.log(this.proteinReportFile);
    if (this.proteinReportFile) {
      this.uploaderService.postFile(this.proteinReportFile,
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
    // TODO add minor check to integrity of parameters
    // adding form values into parameters object

    this.currentProphaneParameters.searchFormat = this.selectedLevel;
    this.currentProphaneParameters.contaminationLabel = this.selectedContaminationOption;
    this.currentProphaneParameters.contaminationPosition = this.contAccession;
    this.currentProphaneParameters.jobLabel = this.jobLabel;
    this.currentProphaneParameters.quantification = this.selectedQuant;
    this.currentProphaneParameters.sampleGroups = this.sampleGroups;
    this.currentProphaneParameters.annotationTasks = [];
    // (const atask: ProphaneAnnotationTaskObject in this.annotationTasks) {
    this.annotationTasks.forEach( (atask: ProphaneAnnotationTaskObject) => {
      this.currentProphaneParameters.annotationTasks.push(atask);
    });
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneParameters, 'mpacloud/v1/prophaneStartJob').subscribe(d => {
      console.log(d);
    });
  }

  requestNewJob(): void {
    // TODO add minor check to integrity of parameters
    this.currentProphaneParameters = new ProphaneParamObject();
    this.currentProphaneParameters.prophaneJobUUID = '';
    this.currentProphaneParameters.csvFilename = this.proteinReportFile.name;
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
    this.proteinReportFile = files[0];
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
