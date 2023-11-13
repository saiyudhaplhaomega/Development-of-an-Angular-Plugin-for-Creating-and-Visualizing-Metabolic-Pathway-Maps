import { Component, OnInit, ViewChild } from '@angular/core';
import { jobLabelData } from '../../../../model/prophaneFormData';
import { AuthGuard, AuthService } from 'shared-lib';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from '../../../../services/job.service';
import { NgbModal, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import {
  NoJobCardHeaders,
  ProphaneJobStateService,
} from '../../../../services/prophane-job-state.service';
import { JobStepperComponent } from '../../job-stepper/job-stepper.component';
import { HttpClientService } from 'shared-lib';
import { UploadProgressService } from 'shared-lib';


export interface JobLabel {
  stepperLabel: string;
  cardHeader: string;
  expertsOnly: boolean;
}

@Component({
  selector: 'app-prophane-job-submission-main',
  templateUrl: './prophane-job-submission-main.component.html',
  styleUrls: ['./prophane-job-submission-main.component.scss'],
  providers: [ProphaneJobStateService],
})
export class ProphaneJobSubmissionMainComponent implements OnInit {
  // Observable passed to child stepper component
  resetStepper: Subject<void> = new Subject<void>();

  currentCardHeader: string;
  stepperAndCardLabels: JobLabel[];

  @ViewChild('prophaneJobStepper') jobStepper: JobStepperComponent;

  constructor(
    public dialog: MatDialog,
    private uploaderService: HttpClientService,
    private jobService: JobService,
    tooltipConfig: NgbTooltipConfig, // TODO: Tooltips are not used!
    private router: Router,
    private modalService: NgbModal,
    private _uploadProgressService: UploadProgressService,
    public authService: AuthService,
    public prophaneJobState: ProphaneJobStateService
  ) {}

  ngOnInit() {
    this.stepperAndCardLabels = jobLabelData;
    this.prophaneJobState.initializeProphaneJobState();
  }

  setCurrentStep(stepLabel: string) {
    const labelObj = jobLabelData.find(
      (label) => label.stepperLabel === stepLabel
    );
    this.currentCardHeader = labelObj.cardHeader;
  }

  onViewChange() {
    this.prophaneJobState.expertView = !this.prophaneJobState.expertView;
    // each time expert prop is changed, reset event is emitted to child
    this.resetStepper.next();
  }

  nextStep() {
    this.jobStepper.nextStep();
  }

  prevStep() {
    this.jobStepper.prevStep();
  }
}
