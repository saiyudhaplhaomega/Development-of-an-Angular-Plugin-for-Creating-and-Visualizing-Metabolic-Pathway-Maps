import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupObject} from './prophanesamplegroupjson';
import {ProphaneReportStyle} from './prophane-job-submission-formdata';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';
import {ProphaneLcaObject} from './prophanelcadata';

export interface ProphaneParamJSON {
  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
  lcaTask: ProphaneLcaObject,
}

export class ProphaneParamObject implements ProphaneParamJSON {

  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
  lcaTask: ProphaneLcaObject;

  constructor () {
    this.contaminationOption = new ProphaneContaminationOptionObject();
    this.sampleGroups = [] as ProphaneSampleGroupObject[];
  }

}



