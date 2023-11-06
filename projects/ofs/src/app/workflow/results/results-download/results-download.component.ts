import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ALLOWEDSIMPLECHARS, InputFormComponent } from 'shared-lib';
import { WorkflowService } from '../../services/workflow.service';
import { StepperService } from '../../services/stepper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ofs-results-download',
  templateUrl: './results-download.component.html',
  styleUrls: ['./results-download.component.scss'],
})
export class ResultsDownloadComponent
  extends InputFormComponent
  implements OnInit, OnDestroy
{
  projectName: FormControl;

  subscriptions: Subscription[];

  constructor(
    public builder: FormBuilder,
    private stepper: StepperService,
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

  downloadData() {
    // TODO: method is called everytime the view is rendered = bad performance
    // console.log(this.workflow.getDownloadLink());
    return this.workflow.getDownloadLink();
  }
}
