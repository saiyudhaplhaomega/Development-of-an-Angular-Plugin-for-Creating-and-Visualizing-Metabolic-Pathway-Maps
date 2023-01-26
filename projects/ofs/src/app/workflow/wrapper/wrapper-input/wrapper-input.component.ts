import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFormComponent } from 'shared-ui-lib';
import { WrapperForm } from '../../models/wrapper.model';

@Component({
  selector: 'ofs-wrapper-input',
  templateUrl: './wrapper-input.component.html',
  styleUrls: ['./wrapper-input.component.scss'],
})
export class WrapperInputComponent
  extends InputFormComponent
  implements OnInit
{
  formModel: FormGroup;

  pvalPreselection: number = 0.01;

  constructor(public builder: FormBuilder) {
    super(builder);
  }

  ngOnInit(): void {
    this.formModel = this.builder.group({
      repeats: [5000, [Validators.required, Validators.min(0)]],
      folds: [5000, [Validators.required, Validators.min(0)]],
    }) as WrapperForm;
  }
}
