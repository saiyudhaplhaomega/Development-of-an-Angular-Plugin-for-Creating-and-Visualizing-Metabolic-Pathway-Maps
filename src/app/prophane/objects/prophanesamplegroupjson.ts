import {ProphaneSampleObject} from './prophanesamplejson';

export interface ProphaneSampleGroupJSON {
  id: number;
  groupname: string;
  groupmembers: string[];
}

export class ProphaneSampleGroupObject implements ProphaneSampleGroupJSON {
  id: number;
  groupname: string;
  groupmembers: string[];
  groupmembersGUI: ProphaneSampleObject[];
}

