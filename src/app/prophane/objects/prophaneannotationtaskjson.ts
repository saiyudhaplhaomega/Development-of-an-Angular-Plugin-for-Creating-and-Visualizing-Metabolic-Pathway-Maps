import {ProphaneTaskOptionString} from './prophanetaskoptionstring';

export interface ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  tasklabel: string;
  optionstring: ProphaneTaskOptionString[];
  formOptionStringSelection: ProphaneTaskOptionString;
}

export class ProphaneAnnotationTaskObject implements ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  tasklabel: string;
  optionstring: ProphaneTaskOptionString[];
  formOptionStringSelection: ProphaneTaskOptionString;
}
