import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Step } from '../models/workflow-steps.model';
import { WorkflowRoutes } from '../models/workflow-routes.model';

/**
 * Service to manage current step of the workflow stepper and current workflow route and synchronize both
 */

// defines steps of the workflow
export const steps: Step[] = [
  {
    index: 0,
    label: 'Data Overview',
    route: WorkflowRoutes.OVERVIEW, // TODO: remove route property
  },
  {
    index: 1,
    label: 'Preprocessing',
    route: WorkflowRoutes.PREPROCESSING,
  },
  {
    index: 2,
    label: 'Wrapper',
    route: WorkflowRoutes.WRAPPER,
  },
  {
    index: 3,
    label: 'Results',
    route: WorkflowRoutes.RESULTS,
  },
];

@Injectable({
  providedIn: 'any',
})
export class StepperService {
  private readonly _workflowSteps: Step[];
  private readonly _stepNumber: number;
  private _currentStep$: BehaviorSubject<Step>;
  private _completedSteps$: BehaviorSubject<boolean[]>;

  constructor() {
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

  // TODO: remove for simplification
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

  // checks whether previous or next step is allowed for navigation
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
    this._currentStep$.next(this._workflowSteps[index]);
  }
}
