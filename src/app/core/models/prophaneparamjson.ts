export interface ProphaneParamJSON {
  prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;
}

export class ProphaneParamObject implements ProphaneParamJSON {
  public prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;
}



