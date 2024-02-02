import { Component } from '@angular/core';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'ofs-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  public completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: StepperService) {}
}
