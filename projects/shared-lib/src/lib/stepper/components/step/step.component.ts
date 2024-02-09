import { Component, Input, OnInit } from '@angular/core';
import { CustomStepperService } from '../../services/custom-stepper.service';

@Component({
  selector: 'shared-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {
  @Input() index: number;
  label: string;

  completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: CustomStepperService) {}

  ngOnInit() {
    this.label = this.stepper.workflowSteps[this.index].label;
  }

  get isLastStep() {
    return this.index === this.stepper.workflowSteps.length - 1;
  }
}
