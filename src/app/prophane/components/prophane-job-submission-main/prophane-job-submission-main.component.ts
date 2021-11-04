import {Component, OnInit, ViewChild} from '@angular/core';
import {JobStepperComponent} from '../job-stepper/job-stepper.component';

import {
  jobLabelData
} from '../../objects/prophaneFormData';
import {AuthGuard} from '../../../core/services/auth-guard.service';
import {Subject} from 'rxjs';
import {ProphaneJobObject} from '../../objects/prophanejobjson';
import {ProphaneParamObject} from '../../objects/prophaneparamjson';
import {ProphaneSampleGroupObject} from '../../objects/prophanesamplegroupjson';
import {MatDialog} from '@angular/material';
import {FileUploaderService} from '../../../core/services/file-uploader.service';
import {JobService} from '../../job.service';
import {NgbModal, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {UploadProgressService} from '../../../core/services/upload-progress.service';
import {ProphaneJobStateService} from './prophane-job-state-service/prophane-job-state.service';

export interface JobLabel {
  label: string;
  expertsOnly: boolean;
}

@Component({
  selector: 'app-prophane-job-submission-main',
  templateUrl: './prophane-job-submission-main.component.html',
  styleUrls: ['./prophane-job-submission-main.component.css'],
  providers: [ProphaneJobStateService]
})
export class ProphaneJobSubmissionMainComponent implements OnInit {

  // Observable passed to child stepper component
  resetStepper: Subject<void> = new Subject<void>();

  // Website related variables
  proteinReportProgress: number;
  proteinReportFile: File;
  fastaProgress: number;
  fastaFile: File;
  // TODO: better solution for this? --> popup message?
  jobUnavailableMessage = 'Service unavailable';
  // global variable that should be able to disable the website (because no server connection or server busy)
  jobUnavailable = false;
  formErrorColor = '#f8d7da';
  currentStepLabel: string;
  stepperLabels: JobLabel[];
  expertView = false;

  // job data is tracked in this variable
  formInputError = [];

  // prophane parameters related variables
  // TODO: check if we can get around these counters ...
  sampleCount = 0;
  groupCount = 0;
  taxtasks = 1;
  functasks = 1;
  taskCounter = 3;

  test = {hi: 'hallo'};

  constructor(
    public dialog: MatDialog,
    private uploaderService: FileUploaderService,
    private jobService: JobService,
    tooltipConfig: NgbTooltipConfig, // Tooltips are not used!
    private router: Router,
    private modalService: NgbModal,
    private _uploadProgressService: UploadProgressService,
    public authGuard: AuthGuard,
    public prophaneJobState: ProphaneJobStateService
  ) { }

  ngOnInit() {
    this.stepperLabels = jobLabelData;

    // TODO: more inits?
    this._uploadProgressService.currentProgress.subscribe(progress => this.fastaProgress = progress);
    this.prophaneJobState.initializeProphaneJobState();
    this.requestNewJob();
  }

  requestNewJob(): void {
    // method is called on init, checks server connection and if server is full
    // request new job creates a job with status 0 now, status 1 when files are send (start job method)
    this.jobService.requestJob(this.prophaneJobState.currentProphaneJob).subscribe(res => {
      this.prophaneJobState.currentProphaneJob = res;
      // this.prophaneJobIDReady = !(this.currentProphaneJob.prophaneJobUUID === '');
      // TODO: obsolete? --> rework
      this.jobUnavailable = res.status === 'JOB_REJECTED';
    });
  }

  setCurrentStep(stepLabel: string) {
    this.currentStepLabel = stepLabel;
  }

  onViewChange() {
    this.expertView = !this.expertView;
    // each time expert prop is changed, reset event is emitted to child
    this.resetStepper.next();
  }

  onSourceChange() {
    this.proteinReportFile = null;
    this.resetSampleGroups();
  }

  resetSampleGroups() {
    this.prophaneJobState.currentProphaneJob.parameters.sampleGroups = [] as ProphaneSampleGroupObject[];
    this.sampleCount = 0;
    this.groupCount = 0;
  }

  }
