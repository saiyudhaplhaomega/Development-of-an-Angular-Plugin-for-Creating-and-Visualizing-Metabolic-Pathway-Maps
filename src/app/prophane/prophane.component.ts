import {Component, OnInit, ViewChild} from '@angular/core';
import {FileUploaderService} from '../main/services/file-uploader.service';
import {MatRadioChange} from '@angular/material/radio';
import {SerializableObjectUploaderService_UNUSED} from '../old_files/serializable-object-uploader.service_UNUSED';
import {HttpEventType} from '@angular/common/http';
import {ProphaneAnnotationTaskObject} from './objects/prophaneannotationtaskjson';
import {ProphaneSampleGroupJSON} from './objects/prophanesamplegroupjson';
import {ViewEncapsulation} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';

import {ProphaneParamObject, ProphaneParamJSON} from './objects/prophaneparamjson';
import {ProphaneJobObject} from './objects/prophanejobjson';
import {ProphaneJobStatusJSON, ProphaneJobStatusObject} from './objects/prophanejobstatusjson';
import {AuthenticatedSerializableObjectUploaderService} from '../main/services/authenticated-serializable-object-uploader.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane.component.html',
  styleUrls: ['./prophane.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProphaneComponent implements OnInit {

  // Website related variables

  // TODO: is this obsolete?
  statusDisplayString = 'No Job Pending';
  expertView = false;
  jobCard: number;
  // global variable that should be able to disable the website (because no server connection or server busy)
  prophaneJobIDReady: boolean;

  // prophane server job related variables
  fastaFile: File;
  proteinReportFile: File;
  csvProgress: number;
  fastaProgress: number;
  // TODO: is this necessary?
  fileUrl: string;
  downloadReady: boolean;
  // TODO: is this necessary?
  prophaneResult: string;
  currentProphaneJob: ProphaneJobObject;
  currentProphaneParameters: ProphaneParamObject;


  // prophane parameters related variables
  // Main options
  selectedLevel;
  leveldata: Array<Object> = [
    {id: 0, name: 'MetaProteomeAnalyzer (MPA)', valueString: 'mpa'},
    {id: 1, name: 'Scaffold', valueString: 'scaffold'},
    {id: 2, name: 'Generic Format', valueString: 'generic'},
    // {id: 3, name: 'Proteome Discoverer'}
  ];
  contval: string;
  contaminationLabel = {valueString: '', regex: ''};
  selectedContaminationOption;
  contaminationdata: Object[] = [
    {id: 0, name: 'accessions starting with', valueString: 'start'},
    {id: 1, name: 'accessions ending with', valueString: 'end'},
    {id: 2, name: 'accessions matching to', valueString: 'regex'},
    {id: 3, name: 'none', valueString: 'none'}
  ];

  // Advanced Options
  jobLabel: string;
  selectedQuant;
  quantdata: object[] = [
    {id: 0, name: 'NSAF (normalized to longest metaprotein sequence)', valueString: 'max_nsaf'},
    {id: 1, name: 'NSAF (normalized to shortest metaprotein sequence)', valueString: 'min_nsaf'},
    {id: 2, name: 'NSAF (normalized to mean metaprotein sequence)', valueString: 'mean_nsaf'},
    {id: 3, name: 'Raw value (no normalization)', valueString: 'raw'},
  ];

  databaseOptions: object[] = [
    {id: 0, scope: 'Function', database: 'eggnog', algorithm: ['emapper']},
    {id: 1, scope: 'Function', database: 'pfams', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 2, scope: 'Function', database: 'tigrfams', algorithm: ['hmmsearch', 'hmmscan']},
    {id: 3, scope: 'Taxonomy', database: 'ncbi_nr', algorithm: ['diamond blastp']},
    {id: 4, scope: 'Taxonomy', database: 'uniprot_complete', algorithm: ['diamond blastp']},
    {id: 5, scope: 'Taxonomy', database: 'uniprot_sp', algorithm: ['diamond blastp']},
    {id: 6, scope: 'Taxonomy', database: 'uniprot_tr', algorithm: ['diamond blastp']},
  ];

  sampleGroups: ProphaneSampleGroupJSON[] = [];
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;

  annotationTasks: ProphaneAnnotationTaskObject[] =
    [{
      scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
      optionstring: '-m diamond', evalue: '0.01', tasklabel: 'Functional Annotation Task 1'
    },
      {
        scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
        optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'Taxonomic Annotation Task 1'
      }];

  taskCounter = 3;

  evalueOptions: object[] = [
    {id: 0, numerical: '0.01', text: 'Relaxed'},
    {id: 1, numerical: '0.001', text: 'Mid-Range'},
    {id: 2, numerical: '0.0005', text: 'Strict'}
  ];

  // constructor and init
  constructor(private uploaderService: FileUploaderService, private jsonUpload: AuthenticatedSerializableObjectUploaderService) {
    this.prophaneJobIDReady = true;
    this.csvProgress = 0;
    this.fastaProgress = 0;
    this.fileUrl = 'http://129.70.51.126:9091/mpacloud/v1/prophaneDownload/';
    this.downloadReady = false;
  }

  ngOnInit(): void {
    // TODO: deleted accidentally
    this.currentProphaneJob = new ProphaneJobObject();
    this.requestNewJob();
  }

  // debug methods
  killAllJobs() {
    this.jsonUpload.postObj<ProphaneParamObject>(this.currentProphaneParameters, 'mpacloud/v1/prophaneKillJobs').subscribe(d => {
      console.log(d);
    });
  }

  // Server job related methods

  // method is called on init, checks server connection and if server is full
  requestNewJob(): void {
    this.currentProphaneParameters = new ProphaneParamObject();
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.prophaneJobUUID = ''; // empty, the request should return a job id
    this.currentProphaneJob.status = ''; // the status is set exclusively by the server
    this.currentProphaneJob.csvFilename = '';
    this.currentProphaneJob.fastaFilename = '';
    this.currentProphaneJob.downloadURL = '';
    this.currentProphaneJob.parameters = this.currentProphaneParameters;
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    console.log('ID: ' + this.currentProphaneJob);
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
      console.log('returned object: ' + res);
      this.currentProphaneJob = res;
      this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID.length > 0);
      console.log(this.currentProphaneJob);
    });
  }

  // this is the submit button
  startButton(): void {
    console.log("start button pressed")
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
  }

  uploadFasta(): void {
    console.log("upload triggered " + this.fastaFile);
    if (this.fastaFile) {
      this.uploaderService.postFile(this.fastaFile,
        'mpacloud/v1/prophaneFasta' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fastaProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.fastaProgress = 0;
            console.log('Response to upload fasta:' + response);
          }
        }
      );
    }
  }

  uploadCSV(): void {
    console.log("upload triggered " + this.proteinReportFile);
    if (this.proteinReportFile) {
      this.uploaderService.postFile(this.proteinReportFile,
        'mpacloud/v1/prophaneCSV' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.csvProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.csvProgress = 0;
            console.log('Response to upload csv:' + response);
          }
        }
      );
    }
  }

  startProphaneJob(): void {
    console.log(this.currentProphaneJob);
    // TODO add minor check to integrity of parameters
    // adding form values into parameters object
    this.currentProphaneParameters.searchFormat = this.selectedLevel.valueString;
    this.currentProphaneParameters.contaminationLabel = this.contaminationLabel.regex;
    this.currentProphaneParameters.contaminationPosition = this.selectedContaminationOption.valueString;
    this.currentProphaneParameters.jobLabel = this.jobLabel;
    this.currentProphaneParameters.quantification = this.selectedQuant.valueString;
    this.currentProphaneParameters.sampleGroups = this.sampleGroups;
    this.currentProphaneParameters.annotationTasks = [];
    this.annotationTasks.forEach((atask: ProphaneAnnotationTaskObject) => {
      this.currentProphaneParameters.annotationTasks.push(atask);
    });
    // reassigning the parameterobject to the jobobject (unnessecary?)
    this.currentProphaneJob.parameters = this.currentProphaneParameters;
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneStartJob').subscribe(d => {
      console.log(d);
    });
  }

  // methods for website functionality

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
        console.log('Nothingness');
      }
    }
  }

  setContaminationLabel(val) {
    if (val === false) {
      val = this.contaminationLabel.valueString;
    }
    if (this.selectedContaminationOption.valueString === 'start') {
      this.contaminationLabel = {valueString: val, regex: '^' + val};
    } else if (this.selectedContaminationOption.valueString === 'end') {
      this.contaminationLabel = {valueString: val, regex: val + '$'};
    } else if (this.selectedContaminationOption.valueString === 'regex') {
      this.contaminationLabel = {valueString: val, regex: val};
    } else if (this.selectedContaminationOption.valueString === 'none') {
      this.contaminationLabel = {valueString: '', regex: '[|]{10000}'};
    }
  }

  addSampleGroup() {
    this.sampleGroups.push(this.getNewGroupItem());
  }

  removeSampleGroup(removeGroup) {
    this.sampleGroups = this.sampleGroups.filter(obj => obj !== removeGroup);
  }

  addNewGroupMember(group) {
    this.sampleCount++;
    group.groupmembers.push('New Sample ' + this.sampleCount);
  }

  removeGroupMember(removemember, group) {
    group.groupmembers = group.groupmembers.filter(obj => obj !== removemember);
  }

  getNewGroupItem() {
    this.sampleCount++;
    this.groupCount++;
    return {groupname: 'New Group ' + this.groupCount, groupmembers: ['New Sample ' + this.sampleCount]};
  }

  filterAnnotationTasks(scope): any[] {
    return this.annotationTasks.filter(i => i.scope === scope);
  }

  addTaxTask() {
    this.taxtasks++;
    this.taskCounter++;
    this.annotationTasks.push({
      scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
      optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'Taxonomic Annotation Task ' + this.taxtasks
    });
  }

  addFuncTask() {
    this.functasks++;
    this.taskCounter++;
    this.annotationTasks.push({
      scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
      optionstring: '-m diamond', evalue: '0.01', tasklabel: 'Functional Annotation Task ' + this.functasks
    });
  }

  removeAnnotationTask(removeTask) {
    this.annotationTasks = this.annotationTasks.filter(obj => obj !== removeTask);
    this.taskCounter--;
  }

  // TODO: this is obsolete?
  onChange(mrChange: MatRadioChange) {
    this.prophaneResult = mrChange.source.value;
    console.log(this.prophaneResult);
  }

  @ViewChild('jobStepper') stepper: MatStepper;
  onViewChange(view) {
    if (view === false) {
      if (this.stepper.selectedIndex == 5) {
        this.moveStepper(1);
      } else {
        this.moveStepper(0);
      }
    } else {
      if (this.stepper.selectedIndex > 0) {
        setTimeout(() => this.moveStepper(5), 10);
      } else {
        this.moveStepper(0);
      }
    }
  }

  nextStep() {
    this.stepper.selectedIndex++;
  }

  prevStep() {
    this.stepper.selectedIndex--;
  }

  moveStepper(step: number) {
    if (this.expertView === false && step > 0) {
      step = 1;
    }
    this.stepper.selectedIndex = step;
    this.jobCard = step;
  }


  showJobCard() {
      this.jobCard = this.stepper.selectedIndex;
  }

  moveStepperToLast() {
    this.stepper.selectedIndex = 5;
  }


  onFastaChange(files: FileList) {
    this.fastaFile = files[0];
  }

  onCSVChange(files: FileList) {
    this.proteinReportFile = files[0];
    // this.currentProphaneJob.prophaneJobUUID = 'e078eef0-0788-11ea-a792-b5c08a0d06a4';
   // this.uploadCSV();
  }

  onSourceChange() {
    this.proteinReportFile = null;
  }

}

