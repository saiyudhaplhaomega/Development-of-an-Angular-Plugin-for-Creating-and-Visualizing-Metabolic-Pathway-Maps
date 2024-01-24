import { Component } from '@angular/core';
import { StepperService } from '../services/stepper.service';

@Component({
  selector: 'ofs-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  public completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: StepperService) {}
}
