import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupObject} from './prophanesamplegroupjson';

export interface ProphaneParamJSON {
  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}

export class ProphaneParamObject implements ProphaneParamJSON {
  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}



