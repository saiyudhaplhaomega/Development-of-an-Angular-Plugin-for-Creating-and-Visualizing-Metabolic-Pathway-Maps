export interface ExperimentJSON {
  expid: string;
  description: string;
  //experiment_data: string;
  name: string;
  creationdate: string;
}

export class ExperimentJSONObject implements ExperimentJSON {
  expid: string;
  description: string;
  //experiment_data: string;
  name: string;
  creationdate: string;
}
