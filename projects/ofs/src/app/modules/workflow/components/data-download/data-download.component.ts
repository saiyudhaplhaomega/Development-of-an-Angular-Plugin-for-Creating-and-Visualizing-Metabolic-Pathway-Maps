import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  ALLOWEDSIMPLECHARS,
  CustomStepperService,
  InputFormComponent,
} from 'shared-lib';
import { WorkflowService } from '../../services/workflow.service';
import { Observable, Subscription, filter, map, tap } from 'rxjs';

@Component({
  selector: 'ofs-data-download',
  templateUrl: './data-download.component.html',
  styleUrls: ['./data-download.component.scss'],
})
export class DataDownloadComponent
  extends InputFormComponent
  implements OnInit, OnDestroy
{
  projectName: FormControl;

  subscriptions: Subscription[];

  dataUrl$: Observable<any> = this.workflow.ofsData$.pipe(
    map((data) => data?.responseData?.classifierResponse?.downloadLink),
    filter((data) => data !== undefined),
    map((data) => this.workflow.getResourceUrls([data]))
  );

  constructor(
    public builder: FormBuilder,
    private stepper: CustomStepperService,
    private workflow: WorkflowService
  ) {
    super(builder);

    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.projectName = new FormControl<string>('OFF_project', [
      Validators.pattern(ALLOWEDSIMPLECHARS),
    ]);
    this.doSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  doSubscriptions() {
    this.subscriptions.push(
      this.stepper.completedSteps$.subscribe((steps) => {
        this.checkCompletedSteps(steps);
      })
    );
  }

  checkCompletedSteps(steps: boolean[]) {
    for (let step of steps) {
      if (!step) {
        this.disableForm();
        return;
      }
    }
    this.enableForm();
  }
}
