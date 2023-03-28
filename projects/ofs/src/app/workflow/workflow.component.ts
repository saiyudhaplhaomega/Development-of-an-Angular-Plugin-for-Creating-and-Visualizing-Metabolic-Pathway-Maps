import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, subscribeOn, Subscription } from 'rxjs';
import { WorkflowRoutes } from './models/workflow-routes.model';
import { Step, steps } from './models/workflow-steps.model';
import { WorkflowService } from './services/workflow.service';

@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  currentStep: Step;
  allowBtnPrev$ = new BehaviorSubject<Boolean>(false);
  allowBtnNext$ = new BehaviorSubject<Boolean>(true);

  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {
    this.workflow.createOfsJob();
    this.updateWorkflowStep(0);
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndex = 0;
  }

  get steps() {
    return steps;
  }

  get currentIndex() {
    return this.stepper?.selectedIndex;
  }

  get stepperLength() {
    return this.stepper?.steps.length;
  }

  get job() {
    return this.workflow?.ofsData.job;
  }

  get OFSData() {
    return this.workflow.ofsData;
  }

  onButtonNavigate(event: string) {
    if (event === 'next' && this.currentIndex < this.stepperLength) {
      this.setStep(this.currentIndex + 1);
    }

    if (event === 'previous' && this.currentIndex > 0) {
      this.setStep(this.currentIndex - 1);
    }
  }

  setStep(selectedIndex: number) {
    this.updateWorkflowStep(selectedIndex).then((resolved) => {
      console.log('navigation resolved: ' + resolved);
      if (resolved) {
        this.stepper.selectedIndex = selectedIndex;
        this.setButtonControl();
      }
    });
  }

  async updateWorkflowStep(selectedIndex: number): Promise<Boolean> {
    const nextStepAllowed = await this.workflow.setRoute(selectedIndex);

    if (nextStepAllowed) {
      this.currentStep = steps[selectedIndex];
    }

    return nextStepAllowed;
  }

  isCompleted(step: Step) {
    switch (step.route) {
      case WorkflowRoutes.OVERVIEW:
        return (
          this.workflow.ofsData.responseData.overviewResponse
            ?.classDistribution !== undefined
        );
      case WorkflowRoutes.PREPROCESSING:
        return (
          this.workflow.ofsData.responseData.preprocessingResponse
            ?.predictivePerformance !== undefined
        );
      case WorkflowRoutes.WRAPPER:
        return (
          this.workflow.ofsData.responseData.wrapperResponse
            ?.featureSelection !== undefined
        );
      case WorkflowRoutes.RESULTS:
        return (
          this.workflow.ofsData.responseData.classifierResponse?.pcaImage !==
          undefined
        );
    }
    return false;
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }

  setButtonControl() {
    if (this.currentIndex == 0) {
      this.allowBtnPrev$.next(false);
    } else {
      this.allowBtnPrev$.next(true);
    }

    console.log(this.isCompleted(this.currentStep));

    if (
      this.currentIndex < this.stepperLength ||
      this.isCompleted(this.currentStep)
    ) {
      this.allowBtnNext$.next(false);
    } else {
      this.allowBtnNext$.next(true);
    }
  }
}
