export interface ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  optionstring: string;
  evalue: string;
  tasklabel: string;
}

export class ProphaneAnnotationTaskObject implements ProphaneAnnotationTaskJSON {
  scope: string;
  database: string;
  databaseversion: string;
  algorithm: string;
  optionstring: string;
  evalue: string;
  tasklabel: string;
}
