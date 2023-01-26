export interface ExperimentJSON {
  expid: string;
  description: string;
  experiment_data: string;
  name: string;
  creationDate: string;
  files_uploaded: boolean;
}

export class ExperimentJSONObject implements ExperimentJSON {
  expid: string;
  description: string;
  experiment_data: string;
  name: string;
  creationDate: string;
  files_uploaded: boolean;
}
