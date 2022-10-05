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

  proteinGroupID: string;
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

export interface Spectrum {
  spectrumID: string; // TODO: Spectrum xml?
}

export class ProteinGroupObject implements ProteinGroupJSON {
  grouptype: Group;
  proteinGroupID: string;
  parentProteinGroupID?: string;
  proteinSubGroupID?: string;
  representativeAccession?: string;
  representativeDescription?: string;
  experimentID: string;

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

export class SpectrumObject implements Spectrum {
  spectrumID: string;
}
