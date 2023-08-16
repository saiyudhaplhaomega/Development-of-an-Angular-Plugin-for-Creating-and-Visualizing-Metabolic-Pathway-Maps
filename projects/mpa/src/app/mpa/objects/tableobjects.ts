export enum GroupingOptions {
  OCCAM = 'OCCAMSRAZOR',
  ANTIOCCAM = 'ANTIOCCAMSRAZOR'
}

export enum ProteinGroupType {
  OCCAMGROUP = "OccamGroup",
  ANTIOCCAMGROUP = "AntiOccamGroup",
  OCCAMSUBGROUP = "OccamSubGroup",
  ANTIOCCAMSUBGROUP = "AntiOccamSubGroup"
}

export interface ProteinGroupJSON {
  groupType: ProteinGroupType;
  proteinGroupID: string;
  parentProteinGroupID?: string;
  representativeAccession?: string;
  representativeDescription?: string;
  experimentID: string;
  hidden: boolean;
  isSelected: boolean;

  proteinSubGroupList?: ProteinGroupObject[];
  proteinList: ProteinJSON[];
  peptideList: PeptideJSON[];
  psmList: PsmJSON[];
  spectrumIDs: string[];
}

export interface ProteinJSON {
  proteinID: string;
  accession: string;
  description?: string;
  peptideNodes: string[];
}

export interface PeptideNode {
  peptideID: string;
}

export interface PeptideJSON {
  sequenceID: string;
}

export interface PsmJSON {
  psmID: string;
  peptideID: string;
  spectrumID: string;
  searchEngine?: string; // TODO: missing
  qValue?: number;  // TODO: missing
}

export interface ProteinSequenceJSON {
  proteinID: string;
  sequence: string;
}

export interface SpectrumJSON {
  spectrumString: string;
  peptideSequence: string;
  peakArray;
}

export class ProteinGroupObject implements ProteinGroupJSON {
  groupType: ProteinGroupType;
  proteinGroupID: string;
  parentProteinGroupID?: string;
  representativeAccession: string;
  representativeDescription: string;
  experimentID: string;
  hidden: boolean;
  isSelected: boolean = false;

  proteinSubGroupList?: ProteinGroupObject[];
  proteinList: ProteinObject[];
  peptideList: PeptideObject[];
  psmList: PsmObject[];
  spectrumIDs: string[];
}

export class ProteinObject implements ProteinJSON {
  proteinID: string;
  accession: string;
  description: string;
  peptideNodes: string[];
}

export class PeptideNodeObject implements PeptideNode {
  peptideID: string;
}

export class PeptideObject implements PeptideJSON {
  sequenceID: string;
}

export class PsmObject implements PsmJSON {
  peptideID: string;
  psmID: string;
  qValue: number;
  searchEngine: string;
  spectrumID: string;
}

export class ProteinSequenceObject implements ProteinSequenceJSON {
  proteinID: string;
  sequence: string;
}

export class SpectrumObject implements SpectrumJSON {
  spectrumString: string;
  peptideSequence: string;
  peakArray;
}
