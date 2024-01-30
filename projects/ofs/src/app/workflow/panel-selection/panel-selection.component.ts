import { Component } from '@angular/core';
import { StepperService } from '../services/stepper.service';

@Component({
  selector: 'ofs-panel-selection',
  templateUrl: './panel-selection.component.html',
  styleUrls: ['./panel-selection.component.scss'],
})
export class PanelSelectionComponent {
  public completedSteps$ = this.stepper.completedSteps$;

  constructor(private stepper: StepperService) {}
}
