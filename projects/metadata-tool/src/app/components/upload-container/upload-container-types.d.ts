// Information about the Pipelines and Which outputs they generate.
// These Outputs determine the input ot the component.

interface Pipeline {
  value: string;
  viewValue: string;
  acceptedDataTypes: string[];
  matchingFilesReges: AcceptedFiles;
}

interface AcceptedFiles {
  spectra?: RegExp;
  peptide?: RegExp;
  PSM?: RegExp;
}

// When the file gets loaded into the component, the `File` type, which is created automatically
// can not be extendet. Therefore the `ProcessedFileInfo` is created which holds additionally information
// for sorting the files.

interface ProcessedFileInfo {
  batchDescription: string;
  sampleNumber: string;
  fileCategory: keyof AcceptedFiles;
}

interface FileWithProcessedInfo {
  file: File;
  processedInfo: ProcessedFileInfo;
}

// This Row data will hold the matching files.
interface RowData {
  [key: string]: FileWithProcessedInfo | undefined;
}
