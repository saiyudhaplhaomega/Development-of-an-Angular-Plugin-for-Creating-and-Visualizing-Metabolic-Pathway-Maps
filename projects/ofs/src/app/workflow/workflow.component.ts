import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from './models/workflow-steps.model';
import { WorkflowService } from './services/workflow.service';
import { StepperService } from './services/stepper.service';

@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent {
  public currentStep$: Observable<Step>;
  public completedSteps$: Observable<boolean[]>;
  public allowPrev$: Observable<boolean>;
  public allowNext$: Observable<boolean>;

  constructor(
    private workflow: WorkflowService,
    private stepperService: StepperService
  ) {
    this.currentStep$ = this.stepperService.currentStep$;
    this.completedSteps$ = this.stepperService.completedSteps$;
    this.allowNext$ = this.stepperService.allowNext$;
    this.allowPrev$ = this.stepperService.allowPrev$;
  }

  ngOnInit(): void {
    this.stepperService.initialize();
    this.workflow.createOfsJob();
    // this.workflow.setDummyConfig();
  }

  get steps() {
    return this.stepperService.workflowSteps;
  }

  get OFSData() {
    return this.workflow.ofsData;
  }

  nextStep() {
    this.setStep(this.stepperService.currentIndex + 1);
  }

  prevStep() {
    this.setStep(this.stepperService.currentIndex - 1);
  }

  setStep(selectedIndex: number) {
    console.log('change');
    this.stepperService.setStep(selectedIndex);
  }
}
