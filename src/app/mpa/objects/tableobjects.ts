export interface ProteinData {
    protein_uuid: string;
    protein_accession: string;
  }

  export interface ProteinList {
    proteingroup_uuid: string;
    proteins: ProteinData[];
  }

  export interface PeptideData {
    peptide_spectrum_matches: PSM[];
    peptide_sequence: string;
  }

  export interface ProteinGroup {
    proteingroup_uuid: string;
    representative_accession: string;
    representative_description: string;
  }

  export interface ProteinGroupList {
    experiment_uuid: string;
    protein_groups: ProteinGroup[];
  }

  export interface PGPeptideList {
    proteingroup_uuid: string;
    experiment_uuid: string;
    peptides: PeptideData[];
  }

  export interface ProtPeptideList {
    protein_uuid: string;
    experiment_uuid: string;
    peptides: PeptideData[];
  }

  export interface PSM {
    peptide: PeptideData;
    spectrum: Spectrum;
    search_engine: string;
    q_value: number;
  }

  export interface Spectrum {
    uuid: string;
  }
