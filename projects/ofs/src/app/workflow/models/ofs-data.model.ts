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

export class OFSData {
  job: OfsJob;
  configData: ConfigData;
  responseData: ResponseData;

  constructor() {
    this.job = new OfsJob();
    this.configData = new ConfigData();
    this.responseData = new ResponseData();
  }
}

export class ConfigData {
  private _overviewConfig: OverviewConfig;
  private _preprocessingConfig: PreprocessingConfig;
  private _wrapperConfig: WrapperConfig;
  private _classifierConfig: ClassifierConfig;

  get overviewConfig(): OverviewConfig {
    return this._overviewConfig;
  }
  set overviewConfig(value: OverviewConfig) {
    this._overviewConfig = value;
  }
  get preprocessingConfig(): PreprocessingConfig {
    return this._preprocessingConfig;
  }
  set preprocessingConfig(value: PreprocessingConfig) {
    this._preprocessingConfig = value;
  }
  get wrapperConfig(): WrapperConfig {
    return this._wrapperConfig;
  }
  set wrapperConfig(value: WrapperConfig) {
    this._wrapperConfig = value;
  }
  get classifierConfig(): ClassifierConfig {
    return this._classifierConfig;
  }
  set classifierConfig(value: ClassifierConfig) {
    this._classifierConfig = value;
  }
}

export class ResponseData {
  private _overviewResponse: OverviewResponse;
  private _preprocessingResponse: PreprocessingResponse;
  private _wrapperResponse: WrapperResponse;
  private _classifierResponse: ClassifierResponse;

  get overviewResponse(): OverviewResponse {
    return this._overviewResponse;
  }
  set overviewResponse(value: OverviewResponse) {
    this._overviewResponse = value;
  }
  get preprocessingResponse(): PreprocessingResponse {
    return this._preprocessingResponse;
  }
  set preprocessingResponse(value: PreprocessingResponse) {
    this._preprocessingResponse = value;
  }
  get wrapperResponse(): WrapperResponse {
    return this._wrapperResponse;
  }
  set wrapperResponse(value: WrapperResponse) {
    this._wrapperResponse = value;
  }
  get classifierResponse(): ClassifierResponse {
    return this._classifierResponse;
  }
  set classifierResponse(value: ClassifierResponse) {
    this._classifierResponse = value;
  }
}
