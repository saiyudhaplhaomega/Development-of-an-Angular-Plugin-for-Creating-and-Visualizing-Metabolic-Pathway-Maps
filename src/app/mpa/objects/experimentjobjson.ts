import {ProphaneParamObject} from '../../prophane/objects/prophaneparamjson';

export interface Experimentjobjson {
  experimentJobUUID: string;
  creationdate: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;
  downloadURL: string;
  // parameters: ProphaneParamObject;
}

export class ExperimentJobObject implements Experimentjobjson {

  creationdate: string;
  csvFilename: string;
  downloadURL: string;
  experimentJobUUID: string;
  fastaFilename: string;
  status: string;
  statusmessage: string;

  constructor() {

  }

}
