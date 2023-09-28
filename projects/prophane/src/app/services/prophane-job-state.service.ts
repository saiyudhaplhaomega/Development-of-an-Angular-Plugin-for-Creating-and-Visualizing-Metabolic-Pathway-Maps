import { Injectable } from '@angular/core';
import { ProphaneJobObject } from '../model/prophanejobjson';
import { ProphaneParamObject } from '../model/prophaneparamjson';
import { ProphaneSampleGroupObject } from '../model/prophanesamplegroupjson';
import {
  contaminationdata,
  databaseOptions,
  defaultAnnotationTasks,
  evalueOptions,
  optionStrings,
  prophaneReportStyles,
  quantdata,
  lcaOptions,
  CustomMapOptions,
  defaultCustomMapTask,
} from '../model/prophaneFormData';
import {ProphaneLcaObject} from '../model/prophanelcadata';
import { JobService } from '../services/job.service';

import { ProphaneTaskOptionString } from '../model/prophanetaskoptionstring';
import { ProphaneAnnotationTaskObject } from '../model/prophaneannotationtaskjson';

import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AuthService, UploadDialogComponent, UploadFile, UploadProgressService } from 'dist/shared-lib';
import { Observable } from 'rxjs';
import { MultiFileUploadData } from 'shared-lib';

import { ProphaneReportStyle } from '../model/prophane-job-submission-formdata';
import { HttpEventType, HttpParams } from '@angular/common/http';



export enum NoJobCardHeaders {
  REQUESTING_JOB = 'Requesting new Prophane Job',
  JOB_UNAVAILABLE = 'No Job available',
  ERROR = 'Request Error',
}

export enum NoJobCardInfo {
  JOB_UNAVAILABLE_MESSAGE = 'Service is not available.',
  WAITING_FOR_RESPONSE = 'Waiting for a job.',
  ERROR = 'An Error occurred',
}

@Injectable({
  providedIn: 'root',
})
export class ProphaneJobStateService {
  currentProphaneJob: ProphaneJobObject;

  // Website related variables
  proteinReportFile: File;
  fastaFile: File;
  customMapFiles: File[] = [];

  expertView = false;
  filesToUpload: MultiFileUploadData;

  // TODO: better solution for this? --> popup message?
  noJobCardHeader: string;
  jobUnavailableMessage: string;
  loading = false;

  // global variable that should be able to disable the website (because no server connection or server busy)
  jobUnavailable = true;

  // job data is tracked in this variable
  formsAreValid = true;
  formErrors = new Map<string, string>();

  // prophane parameters related variables
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 2;
  customtasksCounter = 0;
  lcatasks = 1


  readonly reportStyles = prophaneReportStyles;
  readonly contoptions = contaminationdata;
  readonly quantdata = quantdata;
  readonly evalueOptions = evalueOptions;
  readonly lcaOptions = lcaOptions;
  readonly optionCustomMaps = CustomMapOptions;
  // readonly defaultOptionString = defaultOptionString;
  readonly databaseOptions = databaseOptions;
  readonly optionStrings = optionStrings;
  readonly annotationTasks = JSON.parse(JSON.stringify(defaultAnnotationTasks)); // Important: copy object instead of linking!
  readonly defaultCustomMap = JSON.parse(JSON.stringify(defaultCustomMapTask));

  uploadDialogId = 'prophaneUpload';

  constructor(
    private jobService: JobService,
    private _uploadProgressService: UploadProgressService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService
  ) {}

  async initializeProphaneJobState() {
    this.noJobCardHeader = NoJobCardHeaders.REQUESTING_JOB;
    this.currentProphaneJob = new ProphaneJobObject();
    this.currentProphaneJob.parameters = new ProphaneParamObject();
    this.currentProphaneJob.parameters.contaminationOption =
      this.contoptions[0];
    this.currentProphaneJob.parameters.jobLabel = 'Yet another Prophane job';
    this.currentProphaneJob.parameters.reportStyle = this.reportStyles[0];
    this.currentProphaneJob.parameters.quantification = this.quantdata[0];
    this.currentProphaneJob.parameters.annotationTasks = this.annotationTasks;
    this.currentProphaneJob.parameters.sampleGroups =
      [] as ProphaneSampleGroupObject[];
    this.currentProphaneJob.parameters.lcaTask = this.lcaOptions[0];
    this.currentProphaneJob.prophaneJobUUID = ''; // empty, the request should return a job id
    this.currentProphaneJob.status = ''; // the status is set exclusively by the server
    this.currentProphaneJob.csvFilename = '';
    this.currentProphaneJob.fastaFilename = '';
    this.currentProphaneJob.downloadURL = '';
    this.requestNewJob();
  }

  // Server job related methods
  requestNewJob(): void {
    this.loading = true;
    this.jobUnavailableMessage = NoJobCardInfo.WAITING_FOR_RESPONSE;
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    this.jobService.requestJob(this.currentProphaneJob).subscribe({
      next: (res) => {
        this.currentProphaneJob = res;
        this.jobUnavailable = res.status === 'JOB_REJECTED';
        if (res.status === 'JOB_REJECTED') {
          this.noJobCardHeader = NoJobCardHeaders.JOB_UNAVAILABLE;
          this.jobUnavailableMessage = NoJobCardInfo.JOB_UNAVAILABLE_MESSAGE;
        }
      },
      error: (error) => {
        this.noJobCardHeader = NoJobCardHeaders.ERROR;
        this.jobUnavailableMessage = NoJobCardInfo.ERROR;
      },
      complete: () => (this.loading = false),
    });
  }

  compareByID(o1: ProphaneReportStyle, o2: ProphaneReportStyle) {
    return o1.id === o2.id;
  }

  compare(o1, o2) {
    return o1 === o2;
  }

  filterAnnotationTasks(scope: string): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(
      (i) => i.scope === scope && i.database != "custom_map"
    );
  }

  getCustomTasks(): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(
      (i) => i.database === "custom_map"
    );
  }

  setDefaultAlgorithm(task: ProphaneAnnotationTaskObject, taskIndex: number) {
    task.algorithm = databaseOptions.filter(
      (i) => i['database'] === task.database
    )[0]['algorithm'][0];
    this.resetOptstr(task, taskIndex);
  }

  resetOptstr(task: ProphaneAnnotationTaskObject, taskIndex: number) {
    task.optionstring = optionStrings
      .filter((i) => i['database'] === task.database)[0]
      ['algs'][0]['options'].filter((i) => i['isDefault'] === '1');
    task.formOptionStringSelection = optionStrings.filter(
      (i) => i['database'] === task.database
    )[0]['algs'][0]['defaultOptionStringSelection'];

    for (const key of this.formErrors.keys()) {
      if (key.startsWith(`${task.scope}_task_${taskIndex}`)) {
        this.formErrors.delete(key);
      }
    }
  }

  removeOptionString(
    algoSel: ProphaneTaskOptionString,
    task: ProphaneAnnotationTaskObject,
    taskIndex,
    optionIndex
  ) {
    task.optionstring = task.optionstring.filter((obj) => obj !== algoSel);

    for (const key of this.formErrors.keys()) {
      if (key === `${task.scope}_task_${taskIndex}_option_${optionIndex}`) {
        this.formErrors.delete(key);
      }
    }
  }

  showOption(
    algoSel: ProphaneTaskOptionString,
    task: ProphaneAnnotationTaskObject
  ) {
    if (
      algoSel.avoid &&
      task.optionstring.filter((e) => algoSel.avoid.indexOf(e.param) >= 0)
        .length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  isAlreadyInTask(optionstring: ProphaneTaskOptionString[], option): boolean {
    // console.log(task.optionstring);
    // console.log(option)
    return optionstring.filter((i) => i.param === option.param).length > 0;

    // taskOptionStrings.forEach(opt1 => {
    //  if (opt1 === dropDownItem) {
    //    return true;
    //  }
    // });
    // return false;
    // TODO: this is a override until the above implementation works
  }

  addOptionString(task: ProphaneAnnotationTaskObject) {
    if (
      task.optionstring.filter(
        (e) => e.param === task.formOptionStringSelection.param
      ).length === 0
    ) {
      task.optionstring.push(task.formOptionStringSelection);
    }
  }

  addLCAOptionString(task: ProphaneLcaObject) {
    if (task.optionstring.filter(e =>
      e.param === task.formOptionStringSelection.param).length === 0) {
      task.optionstring.push(task.formOptionStringSelection);
    }
  }

  invokeUploadDialog(): Observable<boolean> {
    this._uploadProgressService.setUUID(
      this.currentProphaneJob.prophaneJobUUID
    );
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      disableClose: true,
      data: { successMessage: 'Job successfully submitted.' },
      id: this.uploadDialogId,
    });

    return dialogRef.afterClosed();
  }


  setEmapperEvalue(): void {
    this.currentProphaneJob.parameters.annotationTasks.forEach((task) => {
      if (task.database === 'eggnog') {
        const m = task.optionstring.filter((i) => i['param'] === 'm')[0][
          'defaultValue'
        ];
        task.optionstring.forEach((parameter) => {
          if (parameter.param === 'evalue') {
            if (m === 'diamond') {
              parameter.param = 'seed_ortholog_evalue';
            } else {
              parameter.param = 'hmm_evalue';
            }
            return;
          }
        });
      }
    });
  }


  // TODO: a lot of this should be contained in JobService
  submitJob(): void {
    if (this.formErrors.size === 0) {

      this.currentProphaneJob.csvFilename = this.proteinReportFile.name;
      this.currentProphaneJob.fastaFilename = this.fastaFile.name;
      this.setEmapperEvalue();

      this._uploadProgressService.reset();
      const onDialogClosingObservable = this.invokeUploadDialog();

      this.filesToUpload = {
        files: [],
        //httpParameters: new HttpParams({fromObject: {partid: this.currentProphaneJob.prophaneJobUUID}})
      };

      const prophaneJsonAsFile = new File([JSON.stringify(this.currentProphaneJob)], 'jobObject');
      const jobObjectFile: UploadFile = {uploadFile: prophaneJsonAsFile, fileID: 'jobObject'};
      const reportFile: UploadFile = {uploadFile: this.proteinReportFile, fileID: 'reportFile'};
      const fastaFile: UploadFile = {uploadFile: this.fastaFile, fileID: 'fastaFile'};

      this.filesToUpload.files.push(jobObjectFile);
      this.filesToUpload.files.push(reportFile);
      this.filesToUpload.files.push(fastaFile);
      // custom maps, id = file name
      if (this.customMapFiles.length > 0){
        this.customMapFiles.forEach(custommap => {
          this.filesToUpload.files.push({uploadFile: custommap, fileID: custommap.name});
        });
      }

      this._uploadProgressService.addToTotal(
        this.filesToUpload.files[0].uploadFile.size
      );

      this.jobService.submitJob(this.filesToUpload)
      .subscribe({
        next: (event) => {
          console.log('unknown event');
          console.log(event);
          console.log(event.type);
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgressService.changeReportLoaded(event.loaded);
            console.log('UploadProgress event');
            console.log(event);
          } else if (event.type === HttpEventType.Response) {
            console.log('Response event');
            console.log(event);
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status >= 400) {
            // handle failed upload
            if (this.dialog.getDialogById(this.uploadDialogId)) {
              this.dialog
                .getDialogById(this.uploadDialogId)
                .componentInstance.setUploadFailed();
              this.dialog.getDialogById(
                this.uploadDialogId
              ).componentInstance.uploadFailedMessage = error.statusText;
            }
          } else {
            throw error;
          }
        },
      });

      onDialogClosingObservable.subscribe((uploadFailed) => {
        console.log('dialog closing');
        if (!uploadFailed) {
          if (this.auth.allowExpert()) {
            this.router.navigate(['./prophanejobcontrol']);
          } else {
            this.router.navigate([
              './results/' + this.currentProphaneJob.prophaneJobUUID,
            ]);
          }
        }
      });




    }
  }

  saveForm(): void {
    // save current job to server
    this.jobService.saveJob(this.currentProphaneJob).subscribe((res) => {
      this.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      this.jobUnavailable = res.status === 'JOB_REJECTED';
    });
  }

  isFormInputValid(
    formElementId: string,
    input: any,
    checkProperty: string,
    required: boolean,
    objArray?: any[]
  ) {
    /**
     * Validates form Inputs and adds non valid inputs to form error map
     * @param {string} formElementId - id to assign form input errors
     * @param {any} input - object containing a property that needs to be validated
     * @param {string} checkProperty - property to be validated
     * @param {boolean} required - true if form value needs to be set
     * @param {any[]} [objArray] - Array containing objects of the input type; Used to validte uniqueness of input. If more than two
     * instances of input.checkProperty are found validator returns false
     * @return {boolean} isValid - isValid defines status of formfield for css styling
     * users
     */
    let isValid = true;
    let errorPrompt: string;
    const type = input.hasOwnProperty('valueType') ? input.valueType : 'string';
    const min = input.min;
    const max = input.max;

    while (true) {
      // check 1: are required inputs provided?
      if (required) {
        const inputCheck = !!input[checkProperty];
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
            regEx = /^[a-zA-Z0-9_ ]+$/;
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
        if (!regEx.test(input[checkProperty])) {
          isValid = false;
          errorPrompt = 'One or more entered characters are not allowed.';
          break;
        }
      }

      // check 3: is input unique?
      if (objArray && checkProperty) {
        const uniquenessCheck = !(
          objArray.filter((obj) => obj[checkProperty] === input[checkProperty])
            .length > 1
        );
        if (!uniquenessCheck) {
          isValid = uniquenessCheck;
          errorPrompt = 'Please enter a unique value!';
          break;
        }
      }

      // check 4: input in bounds?
      if ((type === 'int' || type === 'number') && (min || max)) {
        const minMaxCheck =
          input[checkProperty] >= min || input[checkProperty] <= max;
        if (!minMaxCheck) {
          isValid = minMaxCheck;
          errorPrompt = 'The provided value is out of bounds!';
          break;
        }
      }
      break;
    }

    if (isValid && this.formErrors.has(formElementId)) {
      this.formErrors.delete(formElementId);
    } else if (!isValid && !this.formErrors.has(formElementId)) {
      this.formErrors.set(formElementId, errorPrompt);
    }

    return isValid;
  }
}
