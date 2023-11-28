interface Pipeline {
  value: string;
  viewValue: string;
  acceptedDataTypes: string[];
  matchingFilesReges: acceptedFiles;
}

interface acceptedFiles {
  spectra?: "*_MixA.mgf" | "a";
  Peptide?: "Peptides_*_MixA.mgf";
  PSM?: "PSMs_*_MixA.csv";
}
