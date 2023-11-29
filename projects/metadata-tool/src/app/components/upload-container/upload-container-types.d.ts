interface Pipeline {
  value: string;
  viewValue: string;
  acceptedDataTypes: string[];
  matchingFilesReges: acceptedFiles;
}

interface acceptedFiles {
  spectra?: "(.*)_(.*).mgf$";
  Peptide?: "Peptides_(.*)_(.*).csv$";
  PSM?: "PSMs_(.*)_(.*).csv$";
}
