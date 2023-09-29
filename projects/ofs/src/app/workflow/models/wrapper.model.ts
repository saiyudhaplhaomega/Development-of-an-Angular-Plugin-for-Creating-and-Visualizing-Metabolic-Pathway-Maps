import { FormControl, FormGroup } from '@angular/forms';

export interface WrapperConfig {
  wrapperJobId: string;
  repeats: number;
  folds: number;
  pvalCutoff?: number;
}

export interface WrapperForm extends FormGroup {
  value: WrapperConfig;

  controls: {
    repeats: FormControl;
    folds: FormControl;
    pvalCutoff?: FormControl;
  };
}
