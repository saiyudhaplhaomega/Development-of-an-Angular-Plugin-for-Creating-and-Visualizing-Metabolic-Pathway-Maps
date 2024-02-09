import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { StepComponent } from './components/step/step.component';
import { StepDirective } from './directives/step.directive';

@NgModule({
  declarations: [StepperComponent, StepComponent, StepDirective],
  imports: [CommonModule],
  exports: [StepperComponent, StepDirective],
})
export class StepperModule {}
