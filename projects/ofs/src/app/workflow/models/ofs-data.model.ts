import { OfsJob } from './ofs-job.model';
import { OfsJobState } from './ofs-job.model';

import { OverviewConfig } from './overview.model';
import { PreprocessingConfig } from './preprocessing.model';
import { WrapperConfig } from './wrapper.model';
import { ClassifierConfig } from './classifier.model';

export interface OFSData {
  job: OfsJob;
  configData: ConfigData;
  responseData: ResponseData;
}

export class OFSData implements OFSData {
  constructor() {
    this.job = {
      jobId: '',
      state: OfsJobState.NOJOB,
    };
    this.configData = {};
    this.responseData = {};
  }
}

export interface ConfigData {
  overviewConfig?: OverviewConfig;
  preprocessingConfig?: PreprocessingConfig;
  wrapperConfig?: WrapperConfig;
  classifierConfig?: ClassifierConfig;
}
