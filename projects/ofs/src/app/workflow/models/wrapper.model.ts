import { FormControl, FormGroup } from '@angular/forms';

export interface WrapperConfig {
  wrapperJobId: string;
  repeats: number;
  folds: number;
  pvalCutoff?: number;
}

export class WrapperConfig implements WrapperConfig {
  constructor() {}
}

export interface WrapperForm extends FormGroup {
  value: WrapperConfig;

  controls: {
    repeats: FormControl;
    folds: FormControl;
    pvalCutoff?: FormControl;
  };
}
