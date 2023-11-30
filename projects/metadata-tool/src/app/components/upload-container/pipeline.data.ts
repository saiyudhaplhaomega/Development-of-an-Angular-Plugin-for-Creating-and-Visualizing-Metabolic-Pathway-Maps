const pectraRegex = /(.*)_(.*).mgf$/;
const peptideRegex = /Peptides_(.*)_(.*).csv$/;
const psmRegex = /PSMs_(.*)_(.*).csv$/;

export const pipelineData: Pipeline[] = [
  {
    value: "generic_mzid_mzml",
    viewValue: "Generic (mzid+mzml)",
    acceptedDataTypes: [".mzid", ".mzml"],
    matchingFilesReges: {
      spectra: pectraRegex,
      peptide: peptideRegex
    }
  },
  {
    value: "metaproteomeanalyzer",
    viewValue: "MetaProteomeAnalyzer",
    acceptedDataTypes: [".mgf", ".csv"],
    matchingFilesReges: {
      spectra: pectraRegex,
      peptide: peptideRegex,
      PSM: psmRegex
    }
  },
  {
    value: "proteomediscoverer",
    viewValue: "ProteomeDiscoverer",
    acceptedDataTypes: [".mgf", ".csv"],
    matchingFilesReges: {
      spectra: pectraRegex,
      peptide: peptideRegex,
      PSM: psmRegex
    }
  },
  {
    value: "generic_mgf_mzid",
    viewValue: "Generic (mgf+mzid)",
    acceptedDataTypes: [".mgf", ".mzid"],
    matchingFilesReges: {
      spectra: pectraRegex,
      peptide: peptideRegex,
      PSM: psmRegex
    }
  }
];
