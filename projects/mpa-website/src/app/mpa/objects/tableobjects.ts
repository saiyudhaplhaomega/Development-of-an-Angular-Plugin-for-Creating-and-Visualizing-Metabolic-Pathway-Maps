export enum GroupingOptions {
  OCCAM = 'OCCAMSRAZOR',
  ANTIOCCAM = 'ANTIOCCAMSRAZOR'
}

export enum Group {
  OCCAMGROUP,
  ANTIOCCAMGROUP,
  OCCAMSUBGROUP,
  ANTIOCCAMSUBGROUP
}

export interface ProteinGroupJSON {

  grouptype: Group;
//  parentProteinGroupID?: string;
//  childProteinGroupIDs?: string[];

  proteinGroupID?: string;
  parentProteinGroupID?: string;
  proteinSubGroupID?: string;
  representativeAccession?: string;
  representativeDescription?: string;
  experimentID: string;

  proteinSubGroupList?: ProteinGroupObject[];
  proteinList: ProteinJSON[];
  peptideList: PeptideJSON[];
  psmList: PsmJSON[];
  spectrumIDs: string[];
}

export interface ProteinJSON {
  proteinID: string;
  accession: string; //TODO: missing?
  description?: string; // TODO: missing
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
  //spectrumID: string;
  spectrumString: string;
  peptideSequence: string;
  peakArray;
}

export class ProteinGroupObject implements ProteinGroupJSON {
  grouptype: Group;
  proteinGroupID?: string;
  parentProteinGroupID?: string;
  proteinSubGroupID?: string;
  representativeAccession?: string;
  representativeDescription?: string;
  experimentID: string;
  hidden: boolean;

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
  //spectrumID: string;
  spectrumString: string;
  peptideSequence: string;
  peakArray;
}
