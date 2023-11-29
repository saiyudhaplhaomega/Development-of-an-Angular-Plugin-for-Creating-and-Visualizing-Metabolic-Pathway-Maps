export const pipelineData: Pipeline[] = [
  {
    value: "generic_mzid_mzml",
    viewValue: "Generic (mzid+mzml)",
    acceptedDataTypes: ".mzid , .mzml",
    acceptedDataTypesRegex: "\\.mzid|\\.mzml",
    matchingFiles: {}
  },
  {
    value: "metaproteomeanalyzer",
    viewValue: "MetaProteomeAnalyzer",
    acceptedDataTypes: ".mgf , .csv",
    acceptedDataTypesRegex: "\\.mgf|\\.csv",
    matchingFiles: {
      spectra: "*_MixA.mgf",
      Peptide: "Peptides_*_MixA.mgf",
      PSM: "PSMs_*_MixA.csv"
    }
  },
  {
    value: "proteomediscoverer",
    viewValue: "ProteomeDiscoverer",
    acceptedDataTypes: ".mgf , .csv",
    acceptedDataTypesRegex: "\\.mgf|\\.csv",
    matchingFiles: {
      spectra: "Fisdljsd.mgf",
      Peptide: "Fisdljsd.mgf",
      PSM: "PSMs_Fisdljsd.csv"
    }
  },
  {
    value: "generic_mgf_mzid",
    viewValue: "Generic (mgf+mzid)",
    acceptedDataTypes: ".mgf , .mzid",
    acceptedDataTypesRegex: "\\.mgf|\\.mzid",
    matchingFiles: {}
  }
];
