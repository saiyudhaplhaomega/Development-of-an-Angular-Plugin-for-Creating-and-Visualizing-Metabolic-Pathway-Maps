interface Pipeline {
  value: string;
  viewValue: string;
  acceptedDataTypes: string[];
  matchingFilesReges: AcceptedFiles;
}

interface AcceptedFiles {
  spectra?: RegExp;
  Peptide?: RegExp;
  PSM?: RegExp;
}

interface ProcessedFileInfo {
  batchDescription: string;
  sampleNumber: string;
  fileCategory: keyof AcceptedFiles; // Peptode
}

interface FileWithProcessedInfo {
  file: File;
  processedInfo: ProcessedFileInfo; // Assuming ProcessedFileInfo is defined as shown earlier
}

interface RowData {
  [key: string]: FileWithProcessedInfo | undefined;
}
