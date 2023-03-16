import { OfsJob } from './ofs-job.model';
import { OfsJobState } from './ofs-job.model';

import { OverviewConfig } from './overview.model';
import { PreprocessingConfig } from './preprocessing.model';
import { WrapperConfig } from './wrapper.model';
import { ClassifierConfig } from './classifier.model';
import { OverviewResponse } from '../../models/overview-response.model';
import { PreprocessingResponse } from '../../models/preprocessing-response.model';
import { WrapperResponse } from '../../models/wrapper-response.model';
import { ClassifierResponse } from '../../models/classifier-response.model';

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

export interface ResponseData {
  overviewResponse?: OverviewResponse;
  preprocessingResponse?: PreprocessingResponse;
  wrapperResponse?: WrapperResponse;
  classifierResponse?: ClassifierResponse;
}
