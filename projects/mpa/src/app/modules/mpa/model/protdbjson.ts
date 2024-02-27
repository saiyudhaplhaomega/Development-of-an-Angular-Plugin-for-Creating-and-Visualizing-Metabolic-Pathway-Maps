export interface ProtDBJSON {
  protdbId: string;
  name: string;
  description: string;
  creationdate: string;
  originalFileName: string;
  totalProteins: number;
  userID: string;
	dbType: string;
  //experiment_data: string;
  //status: string;
}
export class ProtDBJSONObject implements ProtDBJSON {
  protdbId: string;
  name: string;
  description: string;
  creationdate: string;
  originalFileName: string;
  totalProteins: number;
  userID: string;
	dbType: string;
  //experiment_data: string;
  //status: string;
}
