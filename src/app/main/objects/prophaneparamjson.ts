import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupJSON} from './prophanesamplegroupjson';

export interface ProphaneParamJSON {
  prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;

  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupJSON[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}

export class ProphaneParamObject implements ProphaneParamJSON {
  public prophaneJobUUID: string;
  csvFilename: string;
  fastaFilename: string;
  status: string;
  downloadURL: string;

  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupJSON[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}



