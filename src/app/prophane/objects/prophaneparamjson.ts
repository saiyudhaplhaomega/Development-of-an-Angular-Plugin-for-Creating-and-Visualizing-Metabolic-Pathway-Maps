import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneSampleGroupObject} from './prophanesamplegroupjson';
import {ProphaneReportStyle} from '../components/prophane-job-submission/prophane-job-submission-formdata';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';

export interface ProphaneParamJSON {
  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}

export class ProphaneParamObject implements ProphaneParamJSON {
  reportStyle: ProphaneReportStyle;
  contaminationOption: ProphaneContaminationOptionObject;
  jobLabel: string;
  quantification: ProphaneQuantDataObject;
  sampleGroups: ProphaneSampleGroupObject[];
  annotationTasks: ProphaneAnnotationTaskObject[];
}



