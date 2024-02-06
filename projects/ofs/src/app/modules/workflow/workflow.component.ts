import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkflowService } from './services/workflow.service';
import { MatStepper } from '@angular/material/stepper';
import { CustomStepperService, Step } from 'shared-lib';
import { OFSData } from './models/ofs-data.model';

export const workflowSteps: Step[] = [
  {
    index: 0,
    label: 'Data overview',
  },
  {
    index: 1,
    label: 'Feature pre-selection',
  },
  {
    index: 2,
    label: 'Feature sampling',
  },
  {
    index: 3,
    label: 'Biomarker panel selection',
  },
  {
    index: 4,
    label: 'Classification',
  },
];

/**
 * Parent component for the workflow stepper. Uses workflow service to track, send,
 *  and request data. Uses the stepper service to manage the stepper.
 */
@Component({
  selector: 'ofs-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit, OnDestroy {
  private Subscriptions: Subscription[];

  public workflowSteps = workflowSteps;

  public completedSteps$ = this.customStepper.completedSteps$;
  public currentStepIndex$ = this.customStepper?.currentIndex$;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private workflow: WorkflowService,
    private customStepper: CustomStepperService
  ) {}

  ngOnInit(): void {
    this.doSubscriptions();
    this.workflow.createOfsJob();
    // this.workflow.setDummyConfig();
  }

  ngOnDestroy() {
    this.Subscriptions.forEach((sub) => sub.unsubscribe());
  }

  doSubscriptions() {
    this.Subscriptions = [
      this.workflow.ofsData$.subscribe((data) => {
        this.updateStepper(data);
      }),
    ];
  }

  updateStepper(data: OFSData) {
    const completed = [
      data.responseData.overviewResponse?.classDistribution != undefined,
      data.responseData.preprocessingResponse?.predictivePerformance !=
        undefined,
      data.responseData.wrapperResponse?.featureSelection != undefined,
      data.configData.classifierConfig?.selectedFeatures != undefined,
      data.responseData.classifierResponse?.pcaImage != undefined,
    ];

    this.customStepper.completedSteps$.next(completed);

    for (let index = 0; index < completed.length; index++) {
      if (!completed[index]) {
        this.setStep(index);
        break;
      }
    }
  }

  setStep(selectedIndex: number) {
    this.customStepper.setStep(selectedIndex);
  }
}
