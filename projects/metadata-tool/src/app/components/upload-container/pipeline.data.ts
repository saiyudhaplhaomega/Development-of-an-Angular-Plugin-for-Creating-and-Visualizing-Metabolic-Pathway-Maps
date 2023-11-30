export const pipelineData: Pipeline[] = [
  {
    value: "generic_mzid_mzml",
    viewValue: "Generic (mzid+mzml)",
    acceptedDataTypes: [".mzid", ".mzml"],
    matchingFilesReges: {
      spectra: /(.*)_(.*).mzid$/,
      Peptide: /Peptides_(.*)_(.*).csv$/,
      PSM: /PSMs_(.*)_(.*).csv$/
    }
  },
  {
    value: "metaproteomeanalyzer",
    viewValue: "MetaProteomeAnalyzer",
    acceptedDataTypes: [".mgf", ".csv"],
    matchingFilesReges: {
      spectra: /(.*)_(.*).mgf$/,
      Peptide: /Peptides_(.*)_(.*).csv$/,
      PSM: /PSMs_(.*)_(.*).csv$/
    }
  },
  {
    value: "proteomediscoverer",
    viewValue: "ProteomeDiscoverer",
    acceptedDataTypes: [".mgf", ".csv"],
    matchingFilesReges: {
      spectra: /(.*)_(.*).mgf$/,
      Peptide: /Peptides_(.*)_(.*).csv$/,
      PSM: /PSMs_(.*)_(.*).csv$/
    }
  },
  {
    value: "generic_mgf_mzid",
    viewValue: "Generic (mgf+mzid)",
    acceptedDataTypes: [".mgf", ".mzid"],
    matchingFilesReges: {
      spectra: /(.*)_(.*).mgf$/,
      Peptide: /Peptides_(.*)_(.*).csv$/,
      PSM: /PSMs_(.*)_(.*).csv$/
    }
  }
];
