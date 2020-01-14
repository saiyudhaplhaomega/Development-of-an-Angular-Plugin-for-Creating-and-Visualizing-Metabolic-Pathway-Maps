import {ProphaneParamJSON} from './prophaneparamjson';
import {ProphaneReportStyle} from '../components/prophane-job-submission/prophane-job-submission-formdata';

export interface ProphaneJobJSON {
  prophaneJobUUID: string;
  creationdate: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;
  downloadURL: string;
  parameters: ProphaneParamJSON;
}

export class ProphaneJobObject implements ProphaneJobJSON {
  public prophaneJobUUID: string;
  creationdate: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;
  downloadURL: string;
  parameters: ProphaneParamJSON;

  getReportStyle() {
    return this.parameters.reportStyle;
  }

  setReportStyle(rstyle: ProphaneReportStyle) {
    this.parameters.reportStyle = rstyle;
  }

  getReportStyleValueString() {
    return this.parameters.reportStyle.valueString;
  }

  getReportStyleID () {
    return this.parameters.reportStyle.id;
  }

  getContaminationOption() {
    return this.parameters.contaminationOption;
  }

  getContaminationOptionID() {
    return this.parameters.contaminationOption.id;
  }

}
