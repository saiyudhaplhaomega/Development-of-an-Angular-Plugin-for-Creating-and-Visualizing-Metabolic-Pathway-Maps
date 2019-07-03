export interface ProphaneParamJSON {
  prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
}

export class ProphaneParamObject implements ProphaneParamJSON {
  public prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
}
