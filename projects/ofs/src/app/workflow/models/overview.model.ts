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

export class DataGroup implements DataGroup {
  constructor(groupName: string) {
    this.groupName = groupName;
  }
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
  overviewJobId: string;
  data: File;
  groups: DataGroup[];
  groupSelectionOptions: GroupSelectionOptions;
}

export class OverviewConfig implements OverviewConfig {
  constructor() {
    this.groups = [new DataGroup('control'), new DataGroup('test')];
  }
}

export interface OverviewInputForm extends FormGroup {
  value: OverviewConfig;

  controls: {
    data: FormControl;
    groupSelectionOptions: FormControl;
    groups: FormArray;
  };
}
