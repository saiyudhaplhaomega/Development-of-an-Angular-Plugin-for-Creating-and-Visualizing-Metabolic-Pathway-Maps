import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from './models/workflow-steps.model';
import { WorkflowService } from './services/workflow.service';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {
  public currentStep$: Observable<Step>;
  public completedSteps$: Observable<boolean[]>;

  constructor(
    private workflow: WorkflowService,
    private stepperService: StepperService
  ) {
    this.currentStep$ = this.stepperService.currentStep$;
    this.completedSteps$ = this.stepperService.completedSteps$;
  }

  //  TODO: internal tracking of mat stepper for current step doesnt work as expected, implement own stepper

  ngOnInit(): void {
    this.stepperService.initialize();
    // this.workflow.createOfsJob();
    this.workflow.setDummyConfig();
  }

  get steps() {
    return this.stepperService.workflowSteps;
  }

  get allowNext() {
    return this.stepperService.allowNext;
  }

  get allowPrev() {
    return this.stepperService.allowPrev;
  }

  get OFSData() {
    return this.workflow.ofsData;
  }

  nextStep() {
    if (this.allowNext) {
      this.setStep(this.stepperService.currentIndex + 1);
    }
  }

  prevStep() {
    if (this.allowPrev) {
      this.setStep(this.stepperService.currentIndex - 1);
    }
  }

  setStep(selectedIndex: number) {
    console.log(selectedIndex);
    this.stepperService.setStep(selectedIndex);
  }
}
