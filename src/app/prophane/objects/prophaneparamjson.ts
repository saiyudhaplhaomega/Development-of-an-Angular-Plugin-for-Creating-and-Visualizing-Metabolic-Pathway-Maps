import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupJSON} from './prophanesamplegroupjson';

export interface ProphaneParamJSON {

  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupJSON[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}

export class ProphaneParamObject implements ProphaneParamJSON {
  searchFormat: string;
  contaminationLabel: string;
  contaminationPosition: string;
  jobLabel: string;
  quantification: string;
  sampleGroups: ProphaneSampleGroupJSON[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}



