import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Step, steps } from '../models/workflow-steps.model';
import { Router } from '@angular/router';
import { WorkflowService } from './workflow.service';
import { WorkflowRoutes } from '../models/workflow-routes.model';

/**
 * Service to manage current step of the workflow stepper and current workflow route and synchronize both
 */

@Injectable({
  providedIn: 'any',
})
export class StepperService {
  private readonly _workflowSteps: Step[];
  private readonly _stepNumber: number;
  private currentStepSubject$: BehaviorSubject<Step>;
  private allowPrevSubject$: BehaviorSubject<boolean>;
  private allowNextSubject$: BehaviorSubject<boolean>;
  private completedStepsSubject$: BehaviorSubject<boolean[]>;

  constructor(private router: Router) {
    this._workflowSteps = steps;
    this._stepNumber = steps.length;

    this.currentStepSubject$ = new BehaviorSubject(this.workflowSteps[0]);
    this.completedStepsSubject$ = new BehaviorSubject(
      this.workflowSteps.map(() => false)
    );
    this.allowPrevSubject$ = new BehaviorSubject(false);
    this.allowNextSubject$ = new BehaviorSubject(true);
  }

  // Getters and Setters
  get workflowSteps(): Readonly<Step[]> {
    return this._workflowSteps;
  }

  get stepNumber(): Readonly<number> {
    return this._stepNumber;
  }

  get currentStep$(): Observable<Step> {
    return this.currentStepSubject$;
  }

  get currentIndex(): Readonly<number> {
    return this.currentStepSubject$.value.index;
  }

  get completedSteps$(): Observable<boolean[]> {
    return this.completedStepsSubject$;
  }

  get allowPrev$(): Observable<boolean> {
    return this.allowPrevSubject$;
  }

  get allowNext$(): Observable<boolean> {
    return this.allowNextSubject$;
  }

  // Methods
  initialize() {
    this.setRoute(0);
  }

  setStepComplete(index: number) {
    const completedSteps = this.completedStepsSubject$.value;
    completedSteps[index] = true;
    this.completedStepsSubject$.next(completedSteps);
  }

  setStepIncomplete(index: number) {
    const completedSteps = this.completedStepsSubject$.value;
    completedSteps[index] = false;
    this.completedStepsSubject$.next(completedSteps);
  }

  setStep(index: number) {
    this.setRoute(index).then((resolved: boolean) => {
      if (resolved) {
        this.currentStepSubject$.next(this._workflowSteps[index]);
      }
    });
  }

  setRoute(index: number) {
    return this.router.navigate(['workflow', this._workflowSteps[index].route]);
  }
}
