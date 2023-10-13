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

  downloadLink = this.workflow.getDownloadLink();

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
    return this.workflow.getDownloadLink();
    //   if (this.workflow.getDownloadLink() !== null) {
    //     const link = document.createElement('a');
    //     link.setAttribute('target', '_blank');
    //     link.setAttribute('href', this.workflow.getDownloadLink());
    //     link.setAttribute('download', 'results.zip');
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    // }
  }
}
