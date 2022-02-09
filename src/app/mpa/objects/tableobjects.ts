
export interface ProteinGroupJSON {
  proteinGroupID: string;
  representativeAccession?: string;
  representativeDescription?: string;
  experimentID: string;

  proteinList: ProteinJSON[];
  peptideList: PeptideJSON[];
  psmList: PsmJSON[];
  spectrumIDs: string[];
}

export interface ProteinJSON {
  proteinID: string;
  name: string;  // TODO: what should be the name?
  description?: string; // TODO: missing
  peptideNodes: string[];
}

export interface PeptideNode {
  peptideID: string;
}

export interface PeptideJSON {
  id: string;
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
  experimentID: string;
  peptideList: PeptideJSON[];
  proteinGroupID: string;
  proteinList: ProteinJSON[];
  psmList: PsmJSON[];
  representativeAccession?: string;
  representativeDescription?: string;
  spectrumIDs: string[];
}

export class ProteinObject implements ProteinJSON {
  description: string;
  name: string;
  peptideNodes: string[];
  proteinID: string;
}

export class PeptideNodeObject implements PeptideNode {
  peptideID: string;
}

export class PeptideObject implements PeptideJSON {
  id: string;
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
