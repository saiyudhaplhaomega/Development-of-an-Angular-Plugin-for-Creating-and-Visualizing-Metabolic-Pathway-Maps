export interface MetadataJson {

  ontId2Param: Map<string, string>;
  ontId2Enabled: Map<string, boolean>;

  	// non ontology entries
  identID: string;
  counter: number;
  psmFile: string;
	peptideFile: string;
	spectrumFile: string;
  mzID: string;
  mzML: string;

}

export class ColumnDataObject implements MetadataJson {

  ontId2Param: Map<string, string>;
  ontId2Enabled: Map<string, boolean>;

  	// non ontology entries
  identID: string;
  counter: number;
  psmFile: string;
	peptideFile: string;
	spectrumFile: string;
  mzID: string;
  mzML: string;

}
