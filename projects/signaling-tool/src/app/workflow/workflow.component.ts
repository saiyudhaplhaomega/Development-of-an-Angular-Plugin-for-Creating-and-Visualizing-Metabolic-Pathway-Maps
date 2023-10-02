import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent {
  // steps = ['Settings', 'Results']; 
  steps = ['Settings', 'Results', 'Exploration'];

  currentStep = 0;

  constructor(private router: Router) {}

  changeStep(stepIndex: number) {
    this.currentStep = stepIndex;
    const step = this.steps[stepIndex].toLowerCase();
    this.router.navigate(['workflow', step]);
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.changeStep(this.currentStep);
    }
  }
  

  goToNextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.changeStep(this.currentStep);
    }
  }
}

