import {
  AfterViewInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { Step, CustomStepperService } from './services/custom-stepper.service';
import { StepDirective } from './directives/step.directive';

@Component({
  selector: 'shared-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  currentIndex$ = this.stepper.currentIndex$;

  completed$ = this.stepper.completedSteps$;

  @Input() steps: Step[];

  @ContentChildren(StepDirective)
  stepTemplates!: QueryList<StepDirective>;

  constructor(private stepper: CustomStepperService) {}

  ngOnInit() {
    this.stepper.initialize(this.steps);
  }
}
