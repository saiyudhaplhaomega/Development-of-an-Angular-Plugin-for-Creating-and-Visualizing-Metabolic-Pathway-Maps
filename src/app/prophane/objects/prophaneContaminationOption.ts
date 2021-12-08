
export interface ProphaneContaminationOptionJSON {
  id: number;
  name: string;
  valueString: string;
  label: string;
  regex: string;
}

export class ProphaneContaminationOptionObject implements ProphaneContaminationOptionJSON {
  id: number;
  name: string;
  valueString: string;
  label: string;
  regex: string;
  formLabel?: string;
}
