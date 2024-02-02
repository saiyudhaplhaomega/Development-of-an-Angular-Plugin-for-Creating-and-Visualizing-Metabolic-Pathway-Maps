import { OfsJob } from './ofs-job.model';
import { OfsJobState } from './ofs-job.model';

import { OverviewConfig } from './overview.model';
import { PreprocessingConfig } from './preprocessing.model';
import { WrapperConfig } from './wrapper.model';
import { ClassifierConfig } from './classifier.model';
import { OverviewResponse } from './overview-response.model';
import { PreprocessingResponse } from './preprocessing-response.model';
import { WrapperResponse } from './wrapper-response.model';
import { ClassifierResponse } from './classifier-response.model';

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
    this.configData = new ConfigData();
    this.responseData = new ResponseData();
  }
}

export interface ConfigData {
  overviewConfig: OverviewConfig;
  preprocessingConfig: PreprocessingConfig;
  wrapperConfig: WrapperConfig;
  classifierConfig: ClassifierConfig;
}

export class ConfigData implements ConfigData {
  constructor() {
    this.overviewConfig = new OverviewConfig();
    this.preprocessingConfig = new PreprocessingConfig();
    this.wrapperConfig = new WrapperConfig();
    this.classifierConfig = new ClassifierConfig();
  }
}

export interface ResponseData {
  overviewResponse?: OverviewResponse;
  preprocessingResponse?: PreprocessingResponse;
  wrapperResponse?: WrapperResponse;
  classifierResponse?: ClassifierResponse;
}

export class ResponseData implements ResponseData {
  constructor() {
    this.overviewResponse = new OverviewResponse();
  }
}
