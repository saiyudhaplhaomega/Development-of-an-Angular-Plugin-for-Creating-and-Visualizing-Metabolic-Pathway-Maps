import {ProphaneParamObject} from './prophaneparamjson';
import {ProphaneReportStyle} from './prophane-job-submission-formdata';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';

export interface ProphaneJobJSON {
  prophaneJobUUID: string;
  creationdate: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;
  downloadURL: string;
  parameters: ProphaneParamObject;
}

export class ProphaneJobObject implements ProphaneJobJSON {
  public prophaneJobUUID: string;
  creationdate: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;
  downloadURL: string;
  parameters: ProphaneParamObject;

  constructor () {
    this.parameters = new ProphaneParamObject();
  }

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
