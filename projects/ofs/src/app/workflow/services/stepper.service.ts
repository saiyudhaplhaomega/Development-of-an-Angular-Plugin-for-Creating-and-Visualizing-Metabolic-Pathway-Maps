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
  private _currentStep$: BehaviorSubject<Step>;
  private _completedSteps$: BehaviorSubject<boolean[]>;

  constructor(private router: Router) {
    this._workflowSteps = steps;
    this._stepNumber = steps.length;
    this._completedSteps$ = new BehaviorSubject(
      this.workflowSteps.map(() => false)
    );
    this._currentStep$ = new BehaviorSubject(this.workflowSteps[0]);
  }

  // Getters and Setters
  get workflowSteps(): Readonly<Step[]> {
    return this._workflowSteps;
  }

  get stepNumber(): Readonly<number> {
    return this._stepNumber;
  }

  get currentStep$(): Observable<Step> {
    return this._currentStep$;
  }

  get currentIndex(): Readonly<number> {
    return this._currentStep$.value.index;
  }

  get completedSteps$(): Observable<boolean[]> {
    return this._completedSteps$;
  }

  get allowPrev(): boolean {
    return (
      this.currentIndex > 0 &&
      this._completedSteps$.value[this.currentIndex - 1]
    );
  }

  get allowNext(): boolean {
    return (
      this.currentIndex < this._stepNumber - 1 &&
      this._completedSteps$.value[this.currentIndex]
    );
  }

  // Methods
  initialize() {
    // this.setRoute(0);
    this.setStep(0);
  }

  setStepComplete(index: number) {
    const steps = this._completedSteps$.value;
    steps[index] = true;
    this._completedSteps$.next(steps);
  }

  setStepIncomplete(index: number) {
    const steps = this._completedSteps$.value;
    steps[index] = false;
    this._completedSteps$.next(steps);
  }

  setStep(index: number) {
    // this.setRoute(index).then((resolved: boolean) => {
    // if (resolved) {
    this._currentStep$.next(this._workflowSteps[index]);
    //   }
    // });
  }

  // private setRoute(index: number) {
  //   return this.router.navigate(['workflow', this._workflowSteps[index].route]);
  // }
}
