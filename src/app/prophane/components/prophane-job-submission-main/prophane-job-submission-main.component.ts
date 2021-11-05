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

  currentStepLabel: string;
  stepperLabels: JobLabel[];
  expertView = false;

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

    this.prophaneJobState.initializeProphaneJobState();
  }

  setCurrentStep(stepLabel: string) {
    this.currentStepLabel = stepLabel;
  }

  onViewChange() {
    this.expertView = !this.expertView;
    // each time expert prop is changed, reset event is emitted to child
    this.resetStepper.next();
  }
  }
