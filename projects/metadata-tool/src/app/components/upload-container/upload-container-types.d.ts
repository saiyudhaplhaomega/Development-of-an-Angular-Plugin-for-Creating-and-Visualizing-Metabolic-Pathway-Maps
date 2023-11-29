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

interface CategorizedFile {
  sampleBatch: string;
  sampleName: string;
  spectra?: File;
  Peptide?: File;
  PSM?: File;
}
