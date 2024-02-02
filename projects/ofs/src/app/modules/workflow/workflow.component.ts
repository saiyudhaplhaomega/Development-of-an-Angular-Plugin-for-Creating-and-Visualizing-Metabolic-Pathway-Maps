import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, filter } from 'rxjs';
import { Step } from './models/workflow-steps.model';
import { WorkflowService } from './services/workflow.service';
import { StepperService } from './services/stepper.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

/**
 * Parent component for the workflow stepper. Uses workflow service to track, send,
 *  and request data. Uses the stepper service to manage the stepper.
 */
@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class WorkflowComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentStepIndex$: Observable<number> =
    this.stepperService.currentIndex$;
  public completedSteps$: Observable<boolean[]> =
    this.stepperService.completedSteps$;

  private Subscriptions: Subscription[];

  @ViewChild('stepper') stepper;

  constructor(
    private workflow: WorkflowService,
    private stepperService: StepperService
  ) {}

  ngOnInit(): void {
    this.doSubscriptions();
    this.stepperService.initialize();
    this.workflow.createOfsJob();
    // this.workflow.setDummyConfig();
  }

  ngAfterViewInit() {
    this.stepperService.currentIndex$.subscribe((index) => {
      this.stepper.selectedIndex = index;
      console.log(this.stepper.selectedIndex);
    });
  }

  ngOnDestroy() {
    this.Subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get steps() {
    return this.stepperService.workflowSteps;
  }

  doSubscriptions() {
    this.Subscriptions = [
      this.workflow.ofsData$.subscribe((data) => {
        this.stepperService.updateCompletedSteps(data);
      }),
    ];
  }

  setStep(selectedIndex: number) {
    this.stepperService.setStep(selectedIndex);
  }

  onInteract(event: any) {
    console.log(event);
  }
}
