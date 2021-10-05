export interface ExperimentJSON {
  exp_id: string;
  description: string;
  experiment_data: string;
  name: string;
  creationDate: string;
}

export class ExperimentJSONObject implements ExperimentJSON {
  exp_id: string;
  description: string;
  experiment_data: string;
  name: string;
  creationDate: string;
}
