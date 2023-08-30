export interface ModelJobJSON {
  model_generator_job_id: string;
  isbalanced: string;
  pride_id_list: string[];
}

export class ModelJobObject implements ModelJobJSON {
  public model_generator_job_id: string;
  public isbalanced: string;
  public pride_id_list: string[];
}
