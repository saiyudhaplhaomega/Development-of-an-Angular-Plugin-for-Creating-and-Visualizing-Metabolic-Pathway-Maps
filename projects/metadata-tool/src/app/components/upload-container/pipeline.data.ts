export const pipelineData: Pipeline[] = [
  {
    value: "generic_mzid_mzml",
    viewValue: "Generic (mzid+mzml)",
    acceptedDataTypes: [".mzid", ".mzml"]
  },
  {
    value: "metaproteomeanalyzer",
    viewValue: "MetaProteomeAnalyzer",
    acceptedDataTypes: [".mgf", ".csv"]
  },
  {
    value: "proteomediscoverer",
    viewValue: "ProteomeDiscoverer",
    acceptedDataTypes: [".mgf", ".csv"]
  },
  {
    value: "generic_mgf_mzid",
    viewValue: "Generic (mgf+mzid)",
    acceptedDataTypes: [".mgf", ".mzid"]
  }
];
