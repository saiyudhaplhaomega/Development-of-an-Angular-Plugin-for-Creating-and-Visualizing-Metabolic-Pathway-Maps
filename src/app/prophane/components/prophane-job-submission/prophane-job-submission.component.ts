import {Component, OnInit, ViewChild} from '@angular/core';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {HttpEventType} from '@angular/common/http';
import {ViewEncapsulation} from '@angular/core';
import {MatStepper} from '@angular/material/stepper';

import {ProphaneParamObject, ProphaneParamJSON} from '../../objects/prophaneparamjson';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticatedSerializableObjectUploaderService} from '../../../core/services/authenticated-serializable-object-uploader.service';
import {Router} from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { prophaneReportStyles } from '../../objects/prophaneFormData';
import { contaminationdata } from '../../objects/prophaneFormData';
import { quantdata } from '../../objects/prophaneFormData';
import { evalueOptions } from '../../objects/prophaneFormData';
import { defaultAnnotationTasks } from '../../objects/prophaneFormData';
import { defaultOptionString } from '../../objects/prophaneFormData';
import { databaseOptions } from '../../objects/prophaneFormData';
import { optionStrings } from '../../objects/prophaneFormData';
import { ProphaneJobSubmissionDialogComponent } from './prophane-job-submission-dialog';
import { MatDialog } from '@angular/material';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';
import {Observable} from 'rxjs';
import {ProphaneAnnotationTaskObject} from '../../objects/prophaneannotationtaskjson';
import {ProphaneTaskOptionString} from '../../objects/prophanetaskoptionstring';


@Component({
  selector: 'app-prophane-job-page',
  templateUrl: './prophane-job-submission.component.html',
  styleUrls: ['./prophane-job-submission.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbTooltipConfig]
})

export class ProphaneJobSubmissionComponent implements OnInit {

  // Website related variables
  expertView = false;
  jobCard: number;
  proteinReportProgress: number;
  proteinReportFile: File;
  fastaProgress: number;
  fastaFile: File;
  // TODO: better solution for this? --> popup message?
  // TODO: rename: serverUnavailable??
  jobUnavailableMessage = 'Service unavailable';
  // global variable that should be able to disable the website (because no server connection or server busy)
  jobUnavailable = false;


  // job data is tracked in this variable

  currentProphaneJob: ProphaneJobObject;
  // currentProphaneJob = new ProphaneJobObject();

  // currentProphaneJob.parameters.reportStyle = prophaneReportStyles[0];

  // this is necessary because typescript doesnt like constants from other files
  reportStyles = prophaneReportStyles;
  contoptions = contaminationdata;
  quantdata = quantdata;
  evalueOptions = evalueOptions;
  annotationTasks = defaultAnnotationTasks;
  defaultOptionString = defaultOptionString;
  databaseOptions = databaseOptions;
  optionStrings = optionStrings;

  // prophane parameters related variables
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 3;
  contval = '';

  // constructor and init
  constructor(public dialog: MatDialog, private uploaderService: FileUploaderService,
              private jsonUpload: AuthenticatedSerializableObjectUploaderService,
              tooltipConfig: NgbTooltipConfig, private router: Router, private modalService: NgbModal, private _uploadProgressService: UploadProgressService) {

    this.jobUnavailable = false;
    this.proteinReportProgress = 0;
    this.fastaProgress = 0;
    tooltipConfig.placement = 'top';
    tooltipConfig.triggers = 'hover';
  }

  //

  ngOnInit(): void {
    // TODO: more inits?
    this.requestNewJob();
    this._uploadProgressService.currentProgress.subscribe(progress => this.fastaProgress = progress);
  }

  // Server job related methods

  // method is called on init, checks server connection and if server is full
  requestNewJob(): void {
    // TODO: move to init?
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentProphaneJob.parameters.contaminationOption = this.contoptions[3];
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentProphaneJob.parameters.jobLabel = 'Yet another Prophane job';
    this.currentProphaneJob.parameters.reportStyle = this.reportStyles[0];
    this.currentProphaneJob.parameters.quantification = this.quantdata[0];
    this.currentProphaneJob.parameters.annotationTasks = JSON.parse(JSON.stringify(defaultAnnotationTasks));
    this.currentProphaneJob.parameters.sampleGroups = [] as ProphaneSampleGroupObject[];
    console.log('length: ' + this.currentProphaneJob.parameters.sampleGroups.length)
    this.currentProphaneJob.prophaneJobUUID = ''; // empty, the request should return a job id
    this.currentProphaneJob.status = ''; // the status is set exclusively by the server
    this.currentProphaneJob.csvFilename = '';
    this.currentProphaneJob.fastaFilename = '';
    this.currentProphaneJob.downloadURL = '';
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    console.log('ID: ' + this.currentProphaneJob);
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
      console.log('returned object: ' + res);
      this.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      if (res.status === 'JOB_REJECTED') {
        this.jobUnavailable = true;
      } else {
        this.jobUnavailable = false;
      }
      // console.log(this.prophaneJobIDReady);
      console.log(this.currentProphaneJob);
    });

  }

  // this is the submit button
  startButton(): void {
    console.log('start button pressed');
    this.openUploadDialog();
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
    // TODO: add redirect to Job Control
    this.router.navigateByUrl('/jobs');
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(ProphaneJobSubmissionDialogComponent, { disableClose: true,
      data: {proteinreportfilename: this.proteinReportFile.name,
        fastafilename: this.fastaFile.name, fastaprogress: this.fastaProgress, csvprogress: this.proteinReportProgress}
    });
  }

  uploadFasta(): void {
    console.log('upload triggered ' + this.fastaFile);
    if (this.fastaFile) {
      this._uploadProgressService.addToTotal(this.fastaFile.size);
      this.uploaderService.postFile(this.fastaFile,
        'mpacloud/v1/prophaneFasta' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgressService.changeFastaLoaded(event.loaded)
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
    console.log('upload triggered ' + this.proteinReportFile);
    if (this.proteinReportFile) {
      this._uploadProgressService.addToTotal(this.proteinReportFile.size);
      this.uploaderService.postFile(this.proteinReportFile,
        'mpacloud/v1/prophaneCSV' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgressService.changeReportLoaded(event.loaded)
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.proteinReportProgress = 0;
            console.log('Response to upload csv:' + response);
          }
        }
      );
    }
  }

  startProphaneJob(): void {
    this.currentProphaneJob.csvFilename = this.proteinReportFile.name;
    this.currentProphaneJob.fastaFilename = this.fastaFile.name;
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneStartJob').subscribe(d => {
      console.log(d);
    });
  }

  requestUserJobList(): void {
    this.jsonUpload.postObj<ProphaneJobObject[]>([], 'mpacloud/v1/prophaneJobList').subscribe(d => {
      console.log(d);
    });
  }

  // methods for website functionality
  paramCompare(o1, o2) {
    console.log('comparator call' + (o1.id === o2.id));
    //return o1.id === o2.id;
    return true;
  }

  // TODO: will soon be replaced
  setDefaultOptionString(event, task) {
    console.log('setting default option ')
    switch (event.value) {
      case 'hmmscan': {
        task.optionstring = [
          {param: 'E', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0', values: []}
        ];
        break;
      }
      case 'hmmsearch' : {
        task.optionstring = [
          {param: 'E', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0', values: []}
        ];
        break;
      }
      case 'emapper' : {
        task.optionstring = [
          {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0', values: []},
          {param: 'm', valueType: 'enum', defaultValue: 'diamond', values: ['diamond', 'hmmer']}
        ];
        break;
      }
      case 'diamond blastp' : {
        console.log('setting new tax ');
        task.optionstring = [
          {param: 'evalue', valueType: 'evalue', defaultValue: '0.0', min: '-1', max: '-1', values: []},
          {param: 'more-sensitive', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []}
        ];
        break;
      }
      default : {
        console.log('Nothingness');
      }
    }
  }

  setContaminationLabel(val) {
    console.log('TEST: ' +  this.currentProphaneJob.parameters.contaminationOption.valueString);
    if (val === false) {
      val = this.currentProphaneJob.parameters.contaminationOption.valueString;
    }
    if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'start') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = '^' + val;
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'end') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = val + '$';
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'regex') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = val;
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'none') {
      this.currentProphaneJob.parameters.contaminationOption.label = '';
      this.currentProphaneJob.parameters.contaminationOption.regex = '[|]{10000}';
    }
  }

  getNewGroupItem() {
    this.groupCount++;
    return {id: this.groupCount, groupname: 'New Group ' + this.groupCount, groupmembers: [], groupmembersGUI: [this.getNewSample()]};
  }

  addSampleGroup() {
    this.currentProphaneJob.parameters.sampleGroups.push(this.getNewGroupItem());
  }

  removeSampleGroup(removeGroup) {
    this.currentProphaneJob.parameters.sampleGroups = this.currentProphaneJob.parameters.sampleGroups.filter(obj => obj !== removeGroup);
  }

  getNewSample() {
    this.sampleCount++;
    return {
      id: this.sampleCount,
      name: 'Sample ' + this.sampleCount,
      biocat: 'Biological sample category ' + this.sampleCount,
      bioname: 'Biological sample name ' + this.sampleCount
    };
  }

  setSampleName(groupid, sampleid) {
    this.currentProphaneJob.parameters.sampleGroups.forEach(function iter(group) {
      if (group.id === groupid) {
        group.groupmembersGUI.forEach(sample => {
          if (sample.id === sampleid) {
            sample.name = sample.biocat.trim() + '::' + sample.bioname.trim();
          }
        });
      }
    });
  }

  addNewSample(group) {
    group.groupmembersGUI.push(this.getNewSample());
  }

  removeSample(id, group) {
    group.groupmembersGUI = group.groupmembersGUI.filter(obj => obj.id !== id);
  }

  filterAnnotationTasks(scope): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(i => i.scope === scope);
  }

  addTaxTask() {
    this.taxtasks++;
    this.taskCounter++;
    this.currentProphaneJob.parameters.annotationTasks.push({
      scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
      optionstring: [
        {param: 'evalue', valueType: 'evalue', defaultValue: '0.0', min: '-1', max: '-1', values: []},
        {param: 'more-sensitive', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []}
      ], tasklabel: 'Taxonomic Annotation Task ' + this.taxtasks,
      formOptionStringSelection: {param: 'evalue', valueType: 'evalue', defaultValue: '0.0', min: '-1', max: '-1', values: []}
    });
  }

  addFuncTask() {
    this.functasks++;
    this.taskCounter++;
    this.currentProphaneJob.parameters.annotationTasks.push({
      scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
      optionstring: [
        {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0', values: []},
        {param: 'm', valueType: 'enum', defaultValue: 'diamond', min: '-1', max: '-1', values: ['diamond', 'hmmer']}
      ], tasklabel: 'Functional Annotation Task ' + this.functasks,
      formOptionStringSelection: {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0', values: []}
    });
  }

  removeAnnotationTask(removeTask) {
    this.currentProphaneJob.parameters.annotationTasks = this.currentProphaneJob.parameters.annotationTasks.filter(obj => obj !== removeTask);
    this.taskCounter--;
  }

  @ViewChild('jobStepper') stepper: MatStepper;

  onViewChange(view) {
    if (view === false) {
      if (this.stepper.selectedIndex === 5) {
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
  }

  onSourceChange() {
    this.proteinReportFile = null;
  }

  addOptionString(task) {
    console.log(task.name);
    console.log(task.formOptionStringSelection.param);
    console.log(task.optionstring.length);
    if (task.optionstring.filter(e => e.param === task.formOptionStringSelection.param).length === 0) {
      task.optionstring.push(task.formOptionStringSelection);
    }
    console.log(task.optionstring.length);
  }

  removeOptionString(algoSel: ProphaneTaskOptionString, task: ProphaneAnnotationTaskObject) {
    console.log(task.optionstring.length);
    task.optionstring = task.optionstring.filter(obj => obj !== algoSel);
    console.log(task.optionstring.length);
  }


}
