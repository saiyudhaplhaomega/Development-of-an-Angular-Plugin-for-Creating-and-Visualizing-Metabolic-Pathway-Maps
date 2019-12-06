import {ProphaneParamJSON} from './prophaneparamjson';

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
}
