export interface ProphaneTaskOptionStringJSON {
  param: string;
  valueType: string;
  defaultValue: string;
  min: string;
  max: string;
  values: string[];
  isDefault: string;
  avoid: string[];
}

export class ProphaneTaskOptionString implements ProphaneTaskOptionStringJSON {
  param: string;
  valueType: string;
  defaultValue: string;
  min: string;
  max: string;
  values: string[];
  isDefault: string;
  avoid: string[];
}
