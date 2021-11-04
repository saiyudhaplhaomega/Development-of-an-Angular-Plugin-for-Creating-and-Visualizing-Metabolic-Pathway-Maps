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

@Injectable({
  providedIn: 'root'
})
export class ProphaneJobStateService {

  currentProphaneJob: ProphaneJobObject;

  readonly reportStyles = prophaneReportStyles;
  readonly contoptions = contaminationdata;
  readonly quantdata = quantdata;
  readonly evalueOptions = evalueOptions;
  readonly annotationTasks = JSON.parse(JSON.stringify(defaultAnnotationTasks)); // Important: copy object instead of linking!
  // readonly defaultOptionString = defaultOptionString;
  readonly databaseOptions = databaseOptions;
  readonly optionStrings = optionStrings;

  constructor() { }

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
  }

}

