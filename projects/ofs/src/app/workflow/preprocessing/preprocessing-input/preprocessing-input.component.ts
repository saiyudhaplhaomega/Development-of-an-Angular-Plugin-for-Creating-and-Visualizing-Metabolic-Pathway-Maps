import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputFormComponent } from 'shared-ui-lib';
import { PreprocessingConfigForm } from '../../models/preprocessing.model';

@Component({
  selector: 'ofs-preprocessing-input',
  templateUrl: './preprocessing-input.component.html',
  styleUrls: ['./preprocessing-input.component.scss'],
})
export class PreprocessingInputComponent
  extends InputFormComponent
  implements OnInit
{
  formModel: FormGroup;

  controlGroupName = 'control';
  testGroupOptions = ['test1', 'test2', 'test3'];

  constructor(public builder: FormBuilder) {
    super(builder);
  }

  ngOnInit(): void {
    this.formModel = this.builder.group(
      {
        controlGroup: new FormControl({
          value: this.controlGroupName,
          disabled: true,
        }),
        testGroup: [this.testGroupOptions[0]],
        repeats: [5000, [Validators.required, Validators.min(0)]],
        folds: [5000, [Validators.required, Validators.min(0)]],
      },
      {
        updateOn: 'blur',
      }
    ) as PreprocessingConfigForm;
  }
}
