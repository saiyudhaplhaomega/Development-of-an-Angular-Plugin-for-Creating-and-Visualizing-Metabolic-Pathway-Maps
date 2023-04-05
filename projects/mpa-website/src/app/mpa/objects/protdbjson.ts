export interface ProtDBJSON {
  protdb_id: string;
  name: string;
  description: string;
  creationdate: string;
  originalFileName: string;
  totalProteins: number;
  //experiment_data: string;
  //status: string;
}
export class ProtDBJSONObject implements ProtDBJSON {
  protdb_id: string;
  name: string;
  description: string;
  creationdate: string;
  originalFileName: string;
  totalProteins: number;
  //experiment_data: string;
  //status: string;
}