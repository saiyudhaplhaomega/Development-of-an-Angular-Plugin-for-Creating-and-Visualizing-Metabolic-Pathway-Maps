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

  constructor(private workflow: WorkflowService) {}

  ngOnInit(): void {
    this.workflow.createOfsJob();
    this.updateWorkflowStep(0);
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndex = 0;
  }

  ngOnDestroy() {}

  get steps() {
    return steps;
  }

  get job() {
    return this.workflow?.ofsJob;
  }

  get overviewImages() {
    return this.workflow?.overviewImages;
  }

  onButtonNavigate(event: string) {
    const currentIndex = this.stepper.selectedIndex;

    if (event === 'next' && currentIndex < this.stepper.steps.length) {
      this.setStep(currentIndex + 1);
    }

    if (event === 'previous' && currentIndex > 0) {
      this.setStep(currentIndex - 1);
    }
  }

  setStep(selectedIndex: number) {
    this.updateWorkflowStep(selectedIndex).then((resolved) => {
      console.log('navigation resolved: ' + resolved);
      if (resolved) {
        this.stepper.selectedIndex = selectedIndex;
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
        return this.workflow.overviewImages !== undefined;
      case WorkflowRoutes.PREPROCESSING:
        return this.workflow.preprocessingImages !== undefined;
      case WorkflowRoutes.WRAPPER:
        return this.workflow.wrapperImages !== undefined;
      case WorkflowRoutes.RESULTS:
        return this.workflow.classifierImages !== undefined;
    }
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }

  showPrev() {
    return true;
  }

  showNext() {
    return true;
  }
}
