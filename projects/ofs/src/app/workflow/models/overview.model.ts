import { FormArray, FormControl, FormGroup } from '@angular/forms';

export enum GroupSelectionOptions {
  PREFIX = 'select by prefix',
  COLUMN = 'select by column numbers',
}

export interface DataGroup {
  groupName: string;
  groupPrefix: string;
  groupStart: number;
  groupEnd: number;
}

export interface DataGroupForm extends FormGroup {
  value: DataGroup;

  controls: {
    groupName: FormControl;
    groupPrefix: FormControl;
    groupStart: FormControl;
    groupEnd: FormControl;
  };
}

export interface OverviewConfig {
  data: File;
  groups: DataGroup[];
  groupSelectionOption: GroupSelectionOptions;
}

export interface OverviewConfigForRequest {
  groups: DataGroup[];
  groupSelectionOption: GroupSelectionOptions;
}

export interface OverviewInputForm extends FormGroup {
  value: OverviewConfig;

  controls: {
    data: FormControl;
    groupSelectionOption: FormControl;
    groups: FormArray;
  };
}
