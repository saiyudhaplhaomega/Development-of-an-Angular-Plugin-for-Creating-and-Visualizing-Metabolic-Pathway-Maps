
export interface FileMetadata {
  processingPipeline: string; // file input drop down menu, change to appropriate object
  spectrumFile: string;
  mzidFile?: string; // in case of MZID which contains all results
  psmFile?: string; // in case results are split into multiple files
  peptideFile?: string; // in case results are split into multiple files
}

export class FileMetadataObject implements FileMetadata {
  processingPipeline: string; // file input drop down menu, change to appropriate object
  spectrumFile: string;
  mzidFile?: string; // in case of MZID which contains all results
  psmFile?: string; // in case results are split into multiple files
  peptideFile?: string; // in case results are split into multiple files
}

