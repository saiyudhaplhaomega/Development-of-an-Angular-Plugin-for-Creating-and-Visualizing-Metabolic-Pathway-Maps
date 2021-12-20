
export interface MPAFile {
  fileID: string;
  experimentID: string;
  fileStatus: string;
  fileMetaData: string;
  fileType: string;
}

export class MPAFileObject implements MPAFile {
  fileID: string;
  experimentID: string;
  fileStatus: string;
  fileMetaData: string;
  fileType: string;
}
