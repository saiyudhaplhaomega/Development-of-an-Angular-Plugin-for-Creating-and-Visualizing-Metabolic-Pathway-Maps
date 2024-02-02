import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Step } from '../models/workflow-steps.model';
import { OFSData } from '../models/ofs-data.model';

/**
 * Service to manage current step of the workflow stepper and current workflow route and synchronize both
 */

// defines steps of the workflow
export const steps: Step[] = [
  {
    index: 0,
    label: 'Data overview',
  },
  {
    index: 1,
    label: 'Feature pre-selection',
  },
  {
    index: 2,
    label: 'Feature sampling',
  },
  {
    index: 3,
    label: 'Biomarker panel selection',
  },
  {
    index: 4,
    label: 'Classification',
  },
];

@Injectable({
  providedIn: 'any',
})
export class StepperService {
  private readonly _workflowSteps: Step[];
  private readonly _stepNumber: number;
  private _currentIndex$: BehaviorSubject<number>;
  _completedSteps$: BehaviorSubject<boolean[]>;

  constructor() {
    this._workflowSteps = steps;
    this._stepNumber = steps.length;
    this._completedSteps$ = new BehaviorSubject(
      this.workflowSteps.map(() => false)
    );
    this._currentIndex$ = new BehaviorSubject(0);
  }

  // Getters and Setters
  get workflowSteps(): Readonly<Step[]> {
    return this._workflowSteps;
  }

  // TODO: remove for simplification
  get stepNumber(): Readonly<number> {
    return this._stepNumber;
  }

  get currentIndex$(): Observable<number> {
    return this._currentIndex$;
  }

  get completedSteps$(): Observable<boolean[]> {
    return this._completedSteps$;
  }

  // checks whether previous or next step is allowed for navigation
  get allowPrev(): boolean {
    return (
      this._currentIndex$.value > 0 &&
      this._completedSteps$.value[this._currentIndex$.value - 1]
    );
  }

  get allowNext(): boolean {
    return (
      this._currentIndex$.value < this._stepNumber - 1 &&
      this._completedSteps$.value[this._currentIndex$.value]
    );
  }

  // Methods
  initialize() {
    this.setStep(0);
  }

  updateCompletedSteps(data: OFSData) {
    let completed = [
      data.responseData.overviewResponse?.classDistribution != undefined,
      data.responseData.preprocessingResponse?.predictivePerformance !=
        undefined,
      data.responseData.wrapperResponse?.featureSelection != undefined,
      data.configData.classifierConfig?.selectedFeatures != undefined,
      data.responseData.classifierResponse?.pcaImage != undefined,
    ];

    this._completedSteps$.next(completed);

    completed.every((step, index) => {
      if (!step) {
        console.log('setStep', index);
        this.setStep(index);
        return false;
      }
    });
  }

  // setStepComplete(completed: boolean[]) {
  //   this._completedSteps$.next(completed);
  // }

  // setStepIncomplete(index: number) {
  //   const steps = [...this._completedSteps$.value];
  //   steps[index] = false;
  //   this._completedSteps$.next(steps);
  // }

  setStep(index: number) {
    if (index < this._stepNumber - 1 && index >= 0) {
      this._currentIndex$.next(index);
    }
  }
}
