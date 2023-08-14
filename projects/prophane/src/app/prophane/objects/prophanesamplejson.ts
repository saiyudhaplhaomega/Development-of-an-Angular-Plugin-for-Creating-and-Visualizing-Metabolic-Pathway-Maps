export interface ProphaneSampleJSON {
  id: number;
  name: string;
  biocat: string;
  bioname: string;
}

export class ProphaneSampleObject implements ProphaneSampleJSON {
  id: number;
  name: string;
  biocat: string;
  bioname: string;
}
