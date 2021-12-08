
export interface ProphaneDataBaseOptionJson {
  id: number;
  scope: string;
  database: string;
  name: string;
  algorithm: string[];
}

export class ProphaneDataBaseOption implements ProphaneDataBaseOptionJson {
  id: number;
  scope: string;
  database: string;
  name: string;
  algorithm: string[];
}
