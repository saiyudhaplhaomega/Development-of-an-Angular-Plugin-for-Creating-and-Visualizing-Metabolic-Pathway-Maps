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
import {ProphaneTaskOptionString} from '../../../objects/prophanetaskoptionstring';
import {ProphaneAnnotationTaskObject} from '../../../objects/prophaneannotationtaskjson';

@Injectable({
  providedIn: 'root'
})
export class ProphaneJobStateService {

  currentProphaneJob: ProphaneJobObject;

  // Website related variables
  proteinReportFile: File;
  fastaFile: File;
  expertView = false;

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

  compare(o1, o2) {
    return o1 === o2;
  }

  filterAnnotationTasks(scope: any): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(i => i.scope === scope);
  }

  isFormInputValid(input: string|number, type: string, required: boolean, objArray?: any[], prop?: string, min?: number, max?: number) {
    let isValid = true;
    let errorPrompt: string;

    while (isValid) {
      // check 1: are required inputs provided?
      if (required) {
        const inputCheck = !!input;
        if (!inputCheck) {
          isValid = inputCheck;
          errorPrompt = 'Please enter something!';
          break;
        }
      }

      // check 2: input type correct?
      if (type) {
        let regEx = null;

        switch (type) {
          case 'string':
            regEx = /^[a-zA-Z]+$/;
            break;
          case 'evalue':
            regEx = /^[0-9]+([.][0-9]*)?$/;
            break;
          case 'number':
            regEx = /^-?[0-9]+([.][0-9]*)?$/;
            break;
          case 'int':
            regEx = /^-?[0-9]+$/;
            break;
        }
        if (!regEx.test(input)) {
          isValid = false;
          errorPrompt = 'One or more entered characters are not allowed.';
          break;
        }
      }

      // check 3: is input unique?
      if (objArray && prop) {
        const uniquenessCheck = !(objArray.filter(obj => obj[prop] === input).length > 1);
        if (!uniquenessCheck) {
          isValid = uniquenessCheck;
          errorPrompt = 'Please enter a unique value!';
          break;
        }
      }

      // check 4: input in bounds?
      if (type === 'int' || type === 'number' && min || max) {
        const minMaxCheck = input >= min || input <= max;
        if (!minMaxCheck) {
          isValid = minMaxCheck;
          errorPrompt = 'The provided value is out of bounds!';
          break;
        }
      }

      break;
    }

    this.formsAreValid = isValid;
    return {isValid, errorPrompt};
  }

  setDefaultAlgorithm(task) {
    task.algorithm = databaseOptions.filter(i => i['database'] === task.database)[0]['algorithm'][0];
    this.resetOptstr(task);
  }

  resetOptstr(task) {
    task.optionstring = optionStrings.filter(
      i => i['database'] === task.database)[0]['algs'][0]['options'].filter(
        i => i['isDefault'] === '1');
    task.formOptionStringSelection = optionStrings.filter(
      i => i['database'] === task.database)[0]['algs'][0]['defaultOptionStringSelection'];
  }

  removeOptionString(algoSel: ProphaneTaskOptionString, task: ProphaneAnnotationTaskObject) {
    task.optionstring = task.optionstring.filter(obj => obj !== algoSel);
  }

  showOption(algoSel: ProphaneTaskOptionString, task: ProphaneAnnotationTaskObject) {
    if (algoSel.avoid && task.optionstring.filter(e => algoSel.avoid.indexOf(e.param) >= 0).length > 0) {
      return false;
    } else {
      return true;
    }
  }

  isAlreadyInTask(optionstring: ProphaneTaskOptionString[], option): boolean {
    // console.log(task.optionstring);
    // console.log(option)
    if (optionstring.filter(i => i.param === option.param).length > 0) {
      return true;
    }
    return false;
    // taskOptionStrings.forEach(opt1 => {
    //  if (opt1 === dropDownItem) {
    //    return true;
    //  }
    // });
    // return false;
    // TODO: this is a override until the above implementation works
  }

  addOptionString(task) {
    if (task.optionstring.filter(e => e.param === task.formOptionStringSelection.param).length === 0) {
      task.optionstring.push(task.formOptionStringSelection);
    }
  }

}

