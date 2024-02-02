import { Component } from '@angular/core';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'ofs-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.scss'],
})
export class PreprocessingComponent {
  public completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: StepperService) {}
}
