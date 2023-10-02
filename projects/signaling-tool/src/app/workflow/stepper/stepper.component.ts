 import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  template: `
    <div class="stepper">
      <div
        *ngFor="let step of steps; let i = index"
        [class.active]="i === currentStep"
        class="step"
        (click)="onStepClick(i)"
      >
        {{ step }}
      </div>
    </div>
  `,
})
export class StepperComponent {
  @Input() steps: string[] = [];
  @Input() currentStep: number = 0;
  @Output() stepChange = new EventEmitter<number>(); // Define the event emitter

  onStepClick(stepIndex: number) {
    this.stepChange.emit(stepIndex); // Emit the event with the step index
  }
}
 