export interface ExperimentJSON {
  expid: string;
  type: string;
  description: string;
  experiments?: string[];
  //experiment_data: string;
  name: string;
  creationdate: string;
  targetFdr: string;

  peakListFiles: string[];
	searchResultFiles: string[];
	protDbId: string;
	isSearched: boolean;

}

export class ExperimentJSONObject implements ExperimentJSON {
  expid: string;
  type: string;
  description: string;
  experiments?: string[];
  //experiment_data: string;
  name: string;
  creationdate: string;
  targetFdr: string;

  peakListFiles: string[];
	searchResultFiles: string[];
	protDbId: string;
	isSearched: boolean;
}
