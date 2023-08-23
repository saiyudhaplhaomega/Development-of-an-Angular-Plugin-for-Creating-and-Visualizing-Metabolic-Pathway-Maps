export interface CustomMapOptionsJSON {
  param: string;
  valueType: string;
  defaultValue: File;
}

export class CustomMapOptionsObject implements CustomMapOptionsJSON {
  param: string;
  valueType: string;
  defaultValue: File;
}

export interface ProphaneCustomMapJSON {  
    scope:string;
    database_type: string;
    algorithm:string;
    tasklabel:string;
    optionstring: CustomMapOptionsJSON[];
    formOptionStringSelection: CustomMapOptionsObject;
  }
  
  export class ProphaneCustomMap implements ProphaneCustomMapJSON {
    scope:string;
    database_type: string;
    algorithm:string;
    tasklabel:string
    optionstring: CustomMapOptionsJSON[];
    formOptionStringSelection: CustomMapOptionsObject;
  }
  
  