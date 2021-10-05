import {ProphaneTaskOptionString} from './prophanetaskoptionstring';

export interface MPAFile {
  file_UUID: string;
  experiment_UUID: string;
  status: string;
  filename: string;
  filetype: string;
}

export class MPAFileObject implements MPAFile {
  file_UUID: string;
  experiment_UUID: string;
  status: string;
  filename: string;
  filetype: string;
}
