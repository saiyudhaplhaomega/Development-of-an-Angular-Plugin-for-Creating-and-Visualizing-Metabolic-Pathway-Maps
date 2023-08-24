import {ProphaneTaskOptionString} from './prophanetaskoptionstring';

export interface ProphaneLCADataJSON {
  name: string;
  method: string;
  optionstring: ProphaneTaskOptionString[];
  formOptionStringSelection: ProphaneTaskOptionString;
}

export class ProphaneLcaObject implements ProphaneLCADataJSON {
  name: string;
  method: string;
  optionstring: ProphaneTaskOptionString[];
  formOptionStringSelection: ProphaneTaskOptionString;
}
