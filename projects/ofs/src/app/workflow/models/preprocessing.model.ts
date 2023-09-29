import { FormControl, FormGroup } from '@angular/forms';

export interface PreprocessingConfig {
  configJobId: string;
  controlGroup: string;
  testGroup: string;
  repeats: number;
  folds: number;
}

export interface PreprocessingConfigForm extends FormGroup {
  value: PreprocessingConfig;

  controls: {
    controlGroup: FormControl;
    testGroup: FormControl;
    repeats: FormControl;
    folds: FormControl;
  };
}
