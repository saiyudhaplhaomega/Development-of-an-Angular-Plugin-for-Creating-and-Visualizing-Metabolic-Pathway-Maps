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
import { ProphaneSampleGroupObject } from '../../objects/prophanesamplegroupjson';
import { Observable } from 'rxjs';
import { ProphaneAnnotationTaskObject } from '../../objects/prophaneannotationtaskjson';
import { ProphaneTaskOptionString } from '../../objects/prophanetaskoptionstring';
import { HttpUploadResponseObject } from '../../objects/httpUploadResponse';


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
  jobUnavailableMessage = 'Service unavailable';
  // global variable that should be able to disable the website (because no server connection or server busy)
  jobUnavailable = false;
  formErrorColor = "#f8d7da"

  // job data is tracked in this variable
  currentProphaneJob: ProphaneJobObject;
  reportStyles = prophaneReportStyles;
  contoptions = contaminationdata;
  quantdata = quantdata;
  evalueOptions = evalueOptions;
  annotationTasks = JSON.parse(JSON.stringify(defaultAnnotationTasks)); //Important: copy object instead of linking!
  defaultOptionString = defaultOptionString;
  databaseOptions = databaseOptions;
  optionStrings = optionStrings;
  formInputError = [];

  // prophane parameters related variables
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 3;


  // constructor and init
  constructor(public dialog: MatDialog, private uploaderService: FileUploaderService,
              private jsonUpload: AuthenticatedSerializableObjectUploaderService,
              tooltipConfig: NgbTooltipConfig, private router: Router,
              private modalService: NgbModal, private _uploadProgressService: UploadProgressService) {

    this.jobUnavailable = false;
    this.proteinReportProgress = 0;
    this.fastaProgress = 0;
    tooltipConfig.placement = 'top';
    tooltipConfig.triggers = 'hover';
  }

  //

  ngOnInit(): void {
    // TODO: more inits?
    this._uploadProgressService.currentProgress.subscribe(progress => this.fastaProgress = progress);
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
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneRequestJob').subscribe(res => {
      this.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      if (res.status === 'JOB_REJECTED') {
        this.jobUnavailable = true;
      } else {
        this.jobUnavailable = false;
      }
    });
  }

  // this is the submit button
  startButton(): void {
    this.openUploadDialog();
    this.uploadCSV();
    this.uploadFasta();
    this.startProphaneJob();
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(ProphaneJobSubmissionDialogComponent, { disableClose: true,
      data: {proteinreportfilename: this.proteinReportFile.name,
        fastafilename: this.fastaFile.name, fastaprogress: this.fastaProgress, csvprogress: this.proteinReportProgress}
    });
  }

  uploadFasta(): void {
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
          }
        }
      );
    }
  }

  uploadCSV(): void {
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
    this.jsonUpload.postObj<ProphaneJobObject>(this.currentProphaneJob, 'mpacloud/v1/prophaneStartJob').subscribe();
  }

  requestUserJobList(): void {
    this.jsonUpload.postObj<ProphaneJobObject[]>([], 'mpacloud/v1/prophaneJobList').subscribe();
  }

  // methods for website functionality
  compareByID(o1, o2) {
    return parseInt(o1.id) === parseInt(o2.id);
  }

  compare(o1, o2) {
    return o1 === o2;
  }

  noCompare(o1, o2){
    return true;
  }

  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  setContaminationLabel(val) {
    if (val === false) {
      val = this.currentProphaneJob.parameters.contaminationOption.valueString;
    }
    if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'start') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = '^' + this.escapeRegExp(val);
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'end') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = this.escapeRegExp(val) + '$';
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'regex') {
      this.currentProphaneJob.parameters.contaminationOption.label = val;
      this.currentProphaneJob.parameters.contaminationOption.regex = val;
    } else if (this.currentProphaneJob.parameters.contaminationOption.valueString === 'none') {
      this.currentProphaneJob.parameters.contaminationOption.label = '';
      this.currentProphaneJob.parameters.contaminationOption.regex = '';
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

  isTaskDropDownSelected(taskOptionStrings: ProphaneTaskOptionString[], dropDownItem: ProphaneTaskOptionString): boolean {
    //taskOptionStrings.forEach(opt1 => {
    //  if (opt1 === dropDownItem) {
    //    return true;
    //  }
    //});
    //return false;
    // TODO: this is a override until the above implementation works
    return true;
  }

  addTaxTask() {
    this.taxtasks++;
    this.taskCounter++;
    var task = JSON.parse(JSON.stringify(defaultAnnotationTasks.filter(i => i['scope'] === 'Taxonomy')[0])); //Important: copy object instead of linking!
    task['tasklabel'] = 'Taxonomic Annotation Task ' + this.taxtasks;
    this.currentProphaneJob.parameters.annotationTasks.push(task);
  }

  addFuncTask() {
    this.functasks++;
    this.taskCounter++;
    var task = JSON.parse(JSON.stringify(defaultAnnotationTasks.filter(i => i['scope'] === 'Function')[0])); //Important: copy object instead of linking!
    task['tasklabel'] =  'Functional Annotation Task ' + this.functasks;
    this.currentProphaneJob.parameters.annotationTasks.push(task);
  }

  setDefaultAlgorithm(task) {
    task.algorithm = databaseOptions.filter(i => i['database'] === task.database)[0]['algorithm'][0];
    this.resetOptstr(task);
  }

  resetOptstr(task) {
    task.optionstring = optionStrings.filter(i => i['dbitem'] === task.algorithm)[0]['options'].filter(i => i['isDefault'] === '1');
    task.formOptionStringSelection = optionStrings.filter(i => i['dbitem'] === task.algorithm)[0]['defaultOptionStringSelection'];
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
    if (task.optionstring.filter(e => e.param === task.formOptionStringSelection.param).length === 0) {
      task.optionstring.push(task.formOptionStringSelection);
    }
  }

  removeOptionString(algoSel: ProphaneTaskOptionString, task: ProphaneAnnotationTaskObject) {
    task.optionstring = task.optionstring.filter(obj => obj !== algoSel);
  }

  isEvalue(value, elemid) {
    if (value === undefined || !String(value).match("^[0-9]+(\[.\][0-9]*)?$")) {
      this.addFormInputErr(elemid);
      return false;
    }
    else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  isNumber(value, min, max, elemid) {
    if (value === undefined || !String(value).match("^-?[0-9]+(\[.\][0-9]*)?$") || (min !== undefined && min > value) || (max !== undefined && max < value) ) {
      this.addFormInputErr(elemid);
      return false;
    }
    else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  isInt(value, min, max, elemid) {
    if (value === undefined || !String(value).match("^-?[0-9]+$") || (min !== undefined && min > value) || (max !== undefined && max < value) ) {
      this.addFormInputErr(elemid);
      return false;
    }
    else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  isString(value, elemid) {
    if (value === undefined || value.length === 0) {
      this.addFormInputErr(elemid);
      return false;
    }
    else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }

  isUniqueTaskLabel(label, elemid) {
    if (!this.isString(label, elemid)) {
      return false;
    }
    var n = 0;
    this.currentProphaneJob.parameters.annotationTasks.forEach(
      task => {
        if (task.tasklabel === label) {
          n +=1;
        }
      });
    if (n > 1) {
      this.addFormInputErr(elemid);
      return false;
    }
    else {
      this.removeFormInputErr(elemid);
      return true;
    }
  }


  addFormInputErr(elemid) {
    if (this.formInputError.indexOf(elemid) === -1) {
      this.formInputError.push(elemid);
    }
  }

  removeFormInputErr(elemid) {
    this.formInputError = this.formInputError.filter(id => id !== elemid);
  }

  optionstringToString(optstr) {
    var s = [];
    var i;
    if (optstr.length == 1) {
      return '-';
    }
    for (i = 0; i < optstr.length; i++) {
      if (optstr[i].valueType === 'none') {
        s.push(optstr[i].param);
      }
      else if (optstr[i].param !== 'evalue') {
        s.push(optstr[i].param + '=' + optstr[i].defaultValue);
      }
    }
    return s.sort().join("; ");
  }

  getEvalue(optstr) {
    return optstr.filter(el => el.valueType === 'evalue')[0].defaultValue;
  }
}

