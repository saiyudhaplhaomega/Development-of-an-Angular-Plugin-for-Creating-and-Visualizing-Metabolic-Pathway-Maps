import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Step {
  index: number;
  label: string;
}

@Injectable({
  providedIn: 'any',
})
export class CustomStepperService {
  workflowSteps: Step[];
  stepNumber: number;
  currentIndex$: BehaviorSubject<number>;
  completedSteps$: BehaviorSubject<boolean[]>;

  constructor() {
    this.currentIndex$ = new BehaviorSubject(0);
    this.completedSteps$ = new BehaviorSubject([]);
  }

  initialize(steps: Step[]) {
    this.workflowSteps = steps;
    this.stepNumber = steps.length;
    this.completedSteps$.next(this.workflowSteps.map(() => false));
    this.currentIndex$.next(0);
  }

  allowPrev(): boolean {
    return (
      this.currentIndex$.value > 0 &&
      this.completedSteps$.value[this.currentIndex$.value - 1]
    );
  }

  allowNext(): boolean {
    return (
      this.currentIndex$.value < this.stepNumber - 1 &&
      this.completedSteps$.value[this.currentIndex$.value]
    );
  }

  setStep(index: number) {
    if (index < this.stepNumber - 1 && index >= 0) {
      this.currentIndex$.next(index);
    }
  }
}

// updateCompletedSteps(data: OFSData) {
//   console.log('checked for change in ofs data');

//   const completed = [
//     data.responseData.overviewResponse?.classDistribution != undefined,
//     data.responseData.preprocessingResponse?.predictivePerformance !=
//       undefined,
//     data.responseData.wrapperResponse?.featureSelection != undefined,
//     data.configData.classifierConfig?.selectedFeatures != undefined,
//     data.responseData.classifierResponse?.pcaImage != undefined,
//   ];

//   this._completedSteps$.next(completed);

//   for (let index = 0; index < completed.length; index++) {
//     if (!completed[index]) {
//       this.setStep(index);
//       break;
//     }
//   }
// }

// setStepComplete(completed: boolean[]) {
//   this._completedSteps$.next(completed);
// }

// setStepIncomplete(index: number) {
//   const steps = [...this._completedSteps$.value];
//   steps[index] = false;
//   this._completedSteps$.next(steps);
//
