import { Injectable } from '@angular/core';
import {ProphaneJobObject} from '../../../objects/prophanejobjson';
import {ProphaneParamObject} from '../../../objects/prophaneparamjson';
import {ProphaneSampleGroupObject} from '../../../objects/prophanesamplegroupjson';
import {
  contaminationdata,
  defaultAnnotationTasks,
  prophaneReportStyles,
  quantdata,
  evalueOptions,
  databaseOptions,
  optionStrings} from '../../../objects/prophaneFormData';
import {JobService} from '../../../job.service';
import {ProphaneReportStyle} from '../prophane-job-submission-formdata';

@Injectable({
  providedIn: 'root'
})
export class ProphaneJobStateService {

  currentProphaneJob: ProphaneJobObject;

  // Website related variables
  proteinReportFile: File;
  fastaFile: File;

  // TODO: better solution for this? --> popup message?
  jobUnavailableMessage = 'Service unavailable';
  // global variable that should be able to disable the website (because no server connection or server busy)
  jobUnavailable = false;

  // job data is tracked in this variable
  formsAreValid = true;

  // prophane parameters related variables
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 3;

  readonly reportStyles = prophaneReportStyles;
  readonly contoptions = contaminationdata;
  readonly quantdata = quantdata;
  readonly evalueOptions = evalueOptions;
  readonly annotationTasks = JSON.parse(JSON.stringify(defaultAnnotationTasks)); // Important: copy object instead of linking!

  // readonly defaultOptionString = defaultOptionString;
  readonly databaseOptions = databaseOptions;
  readonly optionStrings = optionStrings;

  constructor(private jobService: JobService) { }

  initializeProphaneJobState() {
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentProphaneJob.parameters.contaminationOption = this.contoptions[0];
    this.currentProphaneJob.parameters.jobLabel = 'Yet another Prophane job';
    this.currentProphaneJob.parameters.reportStyle = this.reportStyles[0];
    this.currentProphaneJob.parameters.quantification = this.quantdata[0];
    this.currentProphaneJob.parameters.annotationTasks = this.annotationTasks;
    this.currentProphaneJob.parameters.sampleGroups = [] as ProphaneSampleGroupObject[];
    this.currentProphaneJob.prophaneJobUUID = ''; // empty, the request should return a job id
    this.currentProphaneJob.status = ''; // the status is set exclusively by the server
    this.currentProphaneJob.csvFilename = '';
    this.currentProphaneJob.fastaFilename = '';
    this.currentProphaneJob.downloadURL = '';
    this.requestNewJob();
  }

  // Server job related methods

  // method is called on init, checks server connection and if server is full
  requestNewJob(): void {
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    this.jobService.requestJob(this.currentProphaneJob).subscribe(res => {
      this.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      // TODO: obsolete? --> rework
      this.jobUnavailable = res.status === 'JOB_REJECTED';
    });
  }

  compareByID(o1: ProphaneReportStyle, o2: ProphaneReportStyle) {
    return o1.id === o2.id;
  }

  filterAnnotationTasks(scope: any): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(i => i.scope === scope);
  }

  isFormInputValid(input: string, required: boolean, objArray?: any[], prop?: string) {
    console.log(input);
    let isValid = true;
    let errorPrompt: string;

    while (isValid) {
      if (required) {
        console.log(!!input);
        // check 1: are required inputs provided?
        const firstCheck = !!input;
        if (!firstCheck) {
          isValid = firstCheck;
          errorPrompt = 'Please enter something!';
          break;
        }
      }
      if (objArray && prop) {
        // check 2: is there any object with the same prop value as input?
        const secondCheck = !(objArray.filter(obj => obj[prop] === input).length > 1);
        if (!secondCheck) {
          isValid = secondCheck;
          errorPrompt = 'Please enter a unique value!';
          break;
        }
      }
      break;
    }

    this.formsAreValid = isValid;
    // console.log(objArray.filter(obj => obj[prop] === input));
    // console.log(isValid);

    return {isValid, errorPrompt};
  }

  // isUniqueTaskLabel(label, elemid) {
  //   if (!this.isString(label, elemid)) {
  //     return false;
  //   }
  //   var n = 0;
  //   this.currentProphaneJob.parameters.annotationTasks.forEach(
  //     task => {
  //       if (task.tasklabel === label) {
  //         n += 1;
  //       }
  //     });
  //   if (n > 1) {
  //     this.addFormInputErr(elemid);
  //     return false;
  //   }
  //   else {
  //     this.removeFormInputErr(elemid);
  //     return true;
  //   }
  // }

  getAnnotationTasks() {
    return this.currentProphaneJob.parameters.annotationTasks;
  }

}

