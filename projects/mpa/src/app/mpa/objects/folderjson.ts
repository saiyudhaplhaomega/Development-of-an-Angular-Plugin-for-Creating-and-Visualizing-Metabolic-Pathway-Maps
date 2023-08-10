export interface FolderJSON {
    description: string;
    creationDate: string;
    depth: number;
    displayName: string;
    id: number;
    parent: number;
    type: string;
  }
  
  export class FolderJSONObject implements FolderJSON {
    description: string;
    creationDate: string;
    depth: number;
    displayName: string;
    id: number;
    parent: number;
    type: string;
  }