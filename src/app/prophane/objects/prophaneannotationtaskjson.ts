import {ProphaneTaskOptionString} from './prophanetaskoptionstring';

export interface ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  optionstring: ProphaneTaskOptionString[];
  tasklabel: string;
}

export class ProphaneAnnotationTaskObject implements ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  optionstring: ProphaneTaskOptionString[];
  tasklabel: string;
  formOptionStringSelection: ProphaneTaskOptionString;
}
