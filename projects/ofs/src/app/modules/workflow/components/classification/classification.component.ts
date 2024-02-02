import { Component } from '@angular/core';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'ofs-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
})
export class ClassificationComponent {
  public completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: StepperService) {}
}
