import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from 'shared-lib';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'ofs-preprocessing-results-input',
  templateUrl: './preprocessing-results-input.component.html',
  styleUrls: ['./preprocessing-results-input.component.scss'],
})
export class PreprocessingResultsInputComponent
  extends InputFormComponent
  implements OnInit, OnDestroy
{
  pvalCutoff: FormControl;

  constructor(public builder: FormBuilder, private workflow: WorkflowService) {
    super(builder);
  }

  ngOnInit(): void {
    this.pvalCutoff = new FormControl<number>(0.0001, [
      Validators.required,
      Validators.min(0),
    ]);
  }

  ngOnDestroy() {
    this.workflow.ofsData.configData.wrapperConfig.pvalCutoff =
      this.pvalCutoff.value;
  }
}
