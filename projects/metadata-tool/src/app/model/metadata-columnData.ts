export interface MetadataJson {

  ontId2Param: Map<string, string>;
  ontId2Enabled: Map<string, boolean>;

  // these are for JSON.stringify, which cant handle maps
  ontIdParamArray: Array<any>;
  ontId2EnabledArray: Array<any>;

  // non ontology entries
  identID: string;
  counter: number;
  psmFile: string;
  peptideFile: string;
  spectrumFile: string;
  mzID: string;
  mzML: string;
}

export class MetadataJsonObject implements MetadataJson {

  ontId2Param: Map<string, string>;
  ontId2Enabled: Map<string, boolean>;

  // these are for JSON.stringify, which cant handle maps
  ontIdParamArray: Array<any>;
  ontId2EnabledArray: Array<any>;

  // non ontology entries
  identID: string;
  counter: number;
  psmFile: string;
  peptideFile: string;
  spectrumFile: string;
  mzID: string;
  mzML: string;

  constructor() {
    console.log("constructor");
    (this.identID = ''),
      (this.counter = -1),
      (this.mzID = ''),
      (this.mzML = ''),
      (this.spectrumFile = ''),
      (this.psmFile = ''),
      (this.peptideFile = ''),
      (this.ontId2Enabled = new Map<string, boolean>([
        ['sourcename', true],
        ['group', true],
        ['projectIdentifier', true],
        ['project', true],
        ['study', true],
        ['program', true],
        ['biologicalReplicate', true],
        ['metagenomes', true],
        ['ecologicalMetagenomes', true],
        ['syntheticMetagenome', true],
        ['organismalMetagenomes', true],
        ['analyticalFraction', true],
        ['temperatureCondtions', true],
        ['pressure', true],
        ['pH', true],
        ['carbonSource', true],
        ['electronSource', true],
        ['countIdentifiedSpezies', true],
        ['assayName', true],
        ['experimentType', true],
        ['technologyType', true],
        ['technicalReplicate', true],
        ['label', true],
        ['fractionIdentifier', true],
        ['cleavantAgentDetails', true],
        ['instrument', true],
        ['modificationParameters', true],
        ['modificationParameters1', true],
        ['modificationParameters2', true],
        ['dissociationMethod', true],
        ['precursorMassTolerance', true],
        ['fragmentMassTolerance', true],
        ['dataFile', true],
        ['fileUri', true],
        ['comment', true],
        ['factorValue', true],
        ['fileType', true],
      ]));
    this.ontId2Param = new Map<string, string>([
      ['sourcename', ''],
      ['group', ''],
      ['projectIdentifier', ''],
      ['project', ''],
      ['study', ''],
      ['program', ''],
      ['biologicalReplicate', ''],
      ['metagenomes', ''],
      ['ecologicalMetagenomes', ''],
      ['syntheticMetagenome', ''],
      ['organismalMetagenomes', ''],
      ['analyticalFraction', ''],
      ['temperatureCondtions', ''],
      ['pressure', ''],
      ['pH', ''],
      ['carbonSource', ''],
      ['electronSource', ''],
      ['countIdentifiedSpezies', ''],
      ['assayName', 'Assay 1'],
      ['experimentType', ''],
      ['technologyType', ''],
      ['technicalReplicate', ''],
      ['label', ''],
      ['fractionIdentifier', ''],
      ['cleavantAgentDetails', ''],
      ['instrument', ''],
      ['modificationParameters', ''],
      ['modificationParameters1', ''],
      ['modificationParameters2', ''],
      ['dissociationMethod', ''],
      ['precursorMassTolerance', ''],
      ['fragmentMassTolerance', ''],
      ['dataFile', ''],
      ['fileUri', ''],
      ['comment', ''],
      ['factorValue', ''],
      ['fileType', ''],
    ]);
  }
}
