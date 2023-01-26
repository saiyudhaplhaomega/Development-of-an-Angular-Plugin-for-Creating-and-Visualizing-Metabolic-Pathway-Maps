import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from 'shared-ui-lib';

@Component({
  selector: 'ofs-preprocessing-results-input',
  templateUrl: './preprocessing-results-input.component.html',
  styleUrls: ['./preprocessing-results-input.component.scss'],
})
export class PreprocessingResultsInputComponent
  extends InputFormComponent
  implements OnInit
{
  pvalCutoff: FormControl = new FormControl<number>(0.001, [
    Validators.required,
    Validators.min(0),
  ]);

  constructor(builder: FormBuilder) {
    super(builder);
  }

  ngOnInit(): void {}
}
