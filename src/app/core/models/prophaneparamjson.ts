export interface ProphaneParamJSON {
  prophanejobuuid: string;
  csvfilename: string;
  fastafilename: string;
}

export class ProphaneParamObject implements ProphaneParamJSON {
  public prophanejobuuid: string;
  public csvfilename: string;
  public fastafilename: string;
}
