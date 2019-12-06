import {ProphaneSampleObject} from './prophanesamplejson';

export interface ProphaneSampleGroupJSON {
  id: number;
  groupname: string;
  groupmembers: ProphaneSampleObject[];
}

export class ProphaneSampleGroupObject implements ProphaneSampleGroupJSON {
  id: number;
  groupname: string;
  groupmembers: ProphaneSampleObject[];
}
