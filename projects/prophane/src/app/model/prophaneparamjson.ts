import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupObject} from './prophanesamplegroupjson';
import {ProphaneReportStyle} from './prophane-job-submission-formdata';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';
import {ProphaneLcaObject} from './prophanelcadata';
import { ProphaneCustomMap } from './prophanecustommapdata';

export interface ProphaneParamJSON {
  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
  customMapTasks: ProphaneCustomMap[];
  lcaTask: ProphaneLcaObject,
}

export class ProphaneParamObject implements ProphaneParamJSON {

  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
  customMapTasks: ProphaneCustomMap[];
  lcaTask: ProphaneLcaObject;

  constructor () {
    this.contaminationOption = new ProphaneContaminationOptionObject();
    this.sampleGroups = [] as ProphaneSampleGroupObject[];
  }

}



