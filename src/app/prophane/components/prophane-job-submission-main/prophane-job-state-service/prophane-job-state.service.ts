import {Injectable, OnChanges} from '@angular/core';
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
import {UploadProgressService} from '../../../../core/services/upload-progress.service';
import {UploadDialogComponent} from '../../../../core/components/dialog/upload-dialog.component';
import {MatDialog} from '@angular/material';
import {HttpEventType} from '@angular/common/http';
import {FileUploaderService} from '../../../../core/services/file-uploader.service';

@Injectable({
  providedIn: 'root'
})
export class ProphaneJobStateService implements OnChanges {

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
  formErrors = new Map();

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

  proteinReportProgress: number;
  fastaProgress: number;

  constructor(
    private jobService: JobService,
    private _uploadProgressService: UploadProgressService,
    public dialog: MatDialog,
    private uploaderService: FileUploaderService,
  ) { }

  async initializeProphaneJobState() {
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
    const job = this.requestNewJob();
    console.log(job);
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

      }, (error) => {
        console.log('==============================');
        console.log(error);
      });
  }

  compareByID(o1: ProphaneReportStyle, o2: ProphaneReportStyle) {
    return o1.id === o2.id;
  }

  compare(o1, o2) {
    return o1 === o2;
  }

  filterAnnotationTasks(scope: string): any[] {
    return this.currentProphaneJob.parameters.annotationTasks.filter(i => i.scope === scope);
  }

  setDefaultAlgorithm(task: ProphaneAnnotationTaskObject) {
    task.algorithm = databaseOptions.filter(i => i['database'] === task.database)[0]['algorithm'][0];
    this.resetOptstr(task);
  }

  resetOptstr(task: ProphaneAnnotationTaskObject) {
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

  addOptionString(task: ProphaneAnnotationTaskObject) {
    if (task.optionstring.filter(e => e.param === task.formOptionStringSelection.param).length === 0) {
      task.optionstring.push(task.formOptionStringSelection);
    }
  }

  isFormInputValid(input: any, checkProperty: string, required: boolean, objArray?: any[]) {
    /**
     * Validates form Inputs
     * @param {string} formInputId - id to assign form input errors
     * @param {any} input - object containing a property that needs to be validated
     * @param {string} checkProperty - property to be validated
     * @param {boolean} required - true if form value needs to be set
     * @param {any[]} [objArray] - Array containing objects of the input type; Used to validte uniqueness of input. If more than two
     * instances of input.checkProperty are found validator returns false
     * @return {boolean, string} {isValid, errorPrompt} - isValid defines status of formfield for css styling, errorPrompt contains hint for
     * users
     */
    console.log(input);
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
        const uniquenessCheck = !(objArray.filter(obj => obj[checkProperty] === input[checkProperty]).length > 1);
        if (!uniquenessCheck) {
          isValid = uniquenessCheck;
          errorPrompt = 'Please enter a unique value!';
          break;
        }
      }

      // check 4: input in bounds?
      if ((type === 'int' || type === 'number') && (min || max)) {
        const minMaxCheck = input[checkProperty] >= min || input[checkProperty] <= max;
        if (!minMaxCheck) {
          isValid = minMaxCheck;
          errorPrompt = 'The provided value is out of bounds!';
          break;
        }
      }
      break;
    }

    console.log(isValid);
    this.formsAreValid = isValid;
    return {isValid, errorPrompt};
  }

  openUploadDialog(): void {
    this._uploadProgressService.setUUID(this.currentProphaneJob.prophaneJobUUID);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      disableClose: true,
      data: {noRedirect: false, successMessage: 'Job successfully submitted.'},
      id: 'prophaneUpload'
    });
  }

  uploadCSV(): void {
    if (this.proteinReportFile) {
      this._uploadProgressService.addToTotal(this.proteinReportFile.size);
      this.uploaderService.postFile(this.proteinReportFile,
        'mpacloud/v1/prophaneCSV' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgressService.changeReportLoaded(event.loaded);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.proteinReportProgress = 0;
          }
        },
        error => {
          if (error.status === 500) {
            // handle failed upload
            if (this.dialog.getDialogById('prophaneUpload')) {
              this.dialog.getDialogById('prophaneUpload').componentInstance.setUploadFailed();
            }
          }
        }
      );
    }
  }

  uploadFasta(): void {
    if (this.fastaFile) {
      this._uploadProgressService.addToTotal(this.fastaFile.size);
      this.uploaderService.postFile(this.fastaFile,
        'mpacloud/v1/prophaneFasta' + '?name=' + this.currentProphaneJob.prophaneJobUUID).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this._uploadProgressService.changeFastaLoaded(event.loaded);
          } else if (event.type === HttpEventType.Response) {
            let response: any;
            response = event.body;
            this.fastaProgress = 0;
          }
        },
        error => {
          if (error.status === 500) {
            // handle failed upload
            if (this.dialog.getDialogById('prophaneUpload')) {
              this.dialog.getDialogById('prophaneUpload').componentInstance.setUploadFailed();
            }
          } else {
            throw error;
          }
        }
      );
    }
  }

  setEmapperEvalue(): void {
    this.currentProphaneJob.parameters.annotationTasks.forEach(
      task => {
        if (task.database === 'eggnog') {
          const m = task.optionstring.filter(i => i['param'] === 'm')[0]['defaultValue'];
          task.optionstring.forEach(
            parameter => {
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

  startProphaneJob(): void {
    this.currentProphaneJob.csvFilename = this.proteinReportFile.name;
    this.currentProphaneJob.fastaFilename = this.fastaFile.name;
    this.setEmapperEvalue();
    this.jobService.addJob(this.currentProphaneJob).subscribe();
  }

  submitJob(): void {
    this._uploadProgressService.reset();
    this.openUploadDialog();
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
  }

  saveForm(): void {
    // save current job to server
    this.jobService.saveJob(this.currentProphaneJob).subscribe(res => {
      this.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      if (res.status === 'JOB_REJECTED') {
        this.jobUnavailable = true;
      } else {
        this.jobUnavailable = false;
      }
    });
  }

  ngOnChanges(): void {
    console.log(this.formsAreValid);
  }

}

