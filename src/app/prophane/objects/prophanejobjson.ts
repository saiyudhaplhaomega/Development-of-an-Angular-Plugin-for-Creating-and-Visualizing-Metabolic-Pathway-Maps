import {ProphaneParamJSON} from './prophaneparamjson';

export interface ProphaneJobJSON {
  prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;
  parameter: ProphaneParamJSON;

}

export class ProphaneJobObject implements ProphaneJobJSON {
  public prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;
  parameter: ProphaneParamJSON;
}
