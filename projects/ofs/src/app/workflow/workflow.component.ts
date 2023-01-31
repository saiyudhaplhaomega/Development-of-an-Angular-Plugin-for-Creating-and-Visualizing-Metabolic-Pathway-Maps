interface Step {
  label: string;
  route: string;
}

import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { WorkflowService } from './services/workflow.service';

@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  steps = [
    { label: 'Data Overview', route: 'overview' },
    { label: 'Preprocessing', route: 'preprocessing' },
    { label: 'Wrapper', route: 'wrapper' },
    { label: 'Results', route: 'results' },
  ];

  currentStep: Step = { label: '', route: '' };

  constructor(private router: Router, private workflow: WorkflowService) {}

  ngOnInit(): void {
    this.setWorkflowStep(0);
    this.workflow.createOfsJob();
  }

  ngAfterViewInit(): void {
    this.setStepperIndex(0);
  }

  get job() {
    return this.workflow?.ofsJob;
  }

  get overviewImages() {
    return this.workflow?.overviewImages;
  }

  isLoading(): Boolean {
    return this.workflow.loading;
  }

  onStepChange(event: StepperSelectionEvent) {
    this.setWorkflowStep(event.selectedIndex);
  }

  onButtonNavigate(event: string) {
    let newIndex: number;
    const currentIndex: number = this.stepper.selectedIndex;
    if (event === 'next' && currentIndex < this.stepper.steps.length) {
      newIndex = currentIndex + 1;
      this.setStepperIndex(newIndex);
      this.setWorkflowStep(newIndex);
    }

    if (event === 'previous' && currentIndex > 0) {
      newIndex = currentIndex - 1;
      this.setStepperIndex(newIndex);
      this.setWorkflowStep(newIndex);
    }
  }

  setWorkflowStep(selectedIndex: number) {
    this.router.navigate(['workflow', this.steps[selectedIndex].route]);
    this.currentStep = this.steps[selectedIndex];
  }

  setStepperIndex(index: number) {
    this.stepper.selectedIndex = index;
  }
}
