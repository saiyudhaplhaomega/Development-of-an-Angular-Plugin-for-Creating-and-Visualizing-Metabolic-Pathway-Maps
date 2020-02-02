import {ProphaneReportStyle} from '../components/prophane-job-submission/prophane-job-submission-formdata';
import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';
import { sortBy } from 'lodash';

export const prophaneReportStyles: ProphaneReportStyle[] = [
  {id: 0, name: 'MetaProteomeAnalyzer (MPA)', valueString: 'mpa'},
  {id: 1, name: 'Scaffold', valueString: 'scaffold'},
  {id: 2, name: 'Generic Format', valueString: 'generic'},
  // {id: 3, name: 'Proteome Discoverer'}
];

export const quantdata: ProphaneQuantDataObject[] = [
  {id: 0, name: 'NSAF (normalized to longest metaprotein sequence)', valueString: 'max_nsaf'},
  {id: 1, name: 'NSAF (normalized to shortest metaprotein sequence)', valueString: 'min_nsaf'},
  {id: 2, name: 'NSAF (normalized to mean metaprotein sequence)', valueString: 'mean_nsaf'},
  {id: 3, name: 'Raw value (no normalization)', valueString: 'raw'},
];

export const databaseOptions: object[] = [
  {id: 0, scope: 'Function', database: 'eggnog', name: 'EggNog', algorithm: ['emapper']},
  {id: 1, scope: 'Function', database: 'pfams', name: 'PFAMs', algorithm: ['hmmsearch', 'hmmscan']},
  {id: 2, scope: 'Function', database: 'tigrfams', name: 'TIGRFAMs', algorithm: ['hmmsearch', 'hmmscan']},
  {id: 3, scope: 'Function', database: 'dbcan', name: 'CAzY/dbCAN', algorithm: ['hmmsearch', 'hmmscan']},
  {id: 4, scope: 'Function', database: 'resfams_full', name: 'ResFAMs (full)', algorithm: ['hmmsearch', 'hmmscan']},
  {id: 5, scope: 'Function', database: 'resfams_core', name: 'ResFAMs (core)', algorithm: ['hmmsearch', 'hmmscan']},
  {id: 6, scope: 'Taxonomy', database: 'ncbi_nr', name: 'NCBI protein nr', algorithm: ['diamond blastp']},
  {id: 7, scope: 'Taxonomy', database: 'uniprot_complete', name: 'UniprotKB (Swiss-Prot & TrEMBL)', algorithm: ['diamond blastp']},
  {id: 8, scope: 'Taxonomy', database: 'uniprot_sp', name: 'Swiss-Prot', algorithm: ['diamond blastp']},
  {id: 9, scope: 'Taxonomy', database: 'uniprot_tr', name: 'TrEMBL', algorithm: ['diamond blastp']},
];
export const defaultOptionString = [
  {param: 'header', valueType: 'none', defaultValue: ''},
  {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
  {param: 'top', valueType: 'number', defaultValue: '0.0'}];



export const evalueOptions: object[] = [
  {id: 0, numerical: '0.01', text: 'Relaxed'},
  {id: 1, numerical: '0.001', text: 'Mid-Range'},
  {id: 2, numerical: '0.0005', text: 'Strict'}
];

export const contaminationdata: ProphaneContaminationOptionObject[] = [
  {id: 0, name: 'none', valueString: 'none', label: '', regex: ''},
  {id: 1, name: 'accessions starting with', valueString: 'start', label: '', regex: ''},
  {id: 2, name: 'accessions ending with', valueString: 'end', label: '', regex: ''},
  {id: 3, name: 'accessions matching to', valueString: 'regex', label: '', regex: ''},
];

export const defaultAnnotationTasks: ProphaneAnnotationTaskObject[] = [
  {scope: 'Function', database: 'eggnog', databaseversion: 'latest',
    algorithm: 'emapper', tasklabel: 'Functional Annotation Task 1',
    optionstring: [
      {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.001', min: '0.0', max: '10.0', values: []},
      {param: 'm', valueType: 'enum', defaultValue: 'diamond', min: '-1', max: '-1', values: ['diamond', 'hmmer']}
    ],
    formOptionStringSelection: {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.001', min: '0.0', max: '10.0', values: []},
  },
  {scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest',
    algorithm: 'diamond blastp', tasklabel: 'Taxonomic Annotation Task 1',
    optionstring: [
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.001', min: '0', max: '10', values: []},
      {param: 'more-sensitive', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []}
    ],
    formOptionStringSelection: {param: 'evalue', valueType: 'evalue', defaultValue: '0.001', min: '0', max: '10', values: []}
  }
];

export const optionStrings: object[] = [
  {dbitem: 'emapper', options: sortBy([
      {param: 'guessdb', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'tax_scope', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'target_orthologs', valueType: 'enum', defaultValue: 'one2one', min: '-1', max: '-1',
        values: ['one2one', 'many2one', 'one2many', 'many2many', 'all']},
      {param: 'go_evidence', valueType: 'enum', defaultValue: 'experimental', min: '-1', max: '-1',
        values: ['experimental', 'non-electronic']},
      {param: 'hmm_maxhits', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.001', min: '0.0', max: '1.0', values: []},
      {param: 'hmm_score', valueType: 'number', defaultValue: '20.0', min: '-1', max: '-1', values: []},
      {param: 'hmm_maxseqlen', valueType: 'int', defaultValue: '5000', min: '-1', max: '-1', values: []},
      {param: 'hmm_qcov', valueType: 'number', defaultValue: '0', min: '0', max: '1', values: []},
      {param: 'Z', valueType: 'int', defaultValue: '40000000', min: '-1', max: '-1', values: []},
      {param: ' target_orthologs', valueType: 'enum', defaultValue: 'BLOSUM62', min: '-1', max: '-1',
        values: ['BLOSUM62', 'BLOSUM90', 'BLOSUM80', 'BLOSUM50', 'BLOSUM45', 'PAM250', 'PAM70', 'PAM30']},
      {param: 'query-cover', valueType: 'number', defaultValue: '0', min: '0', max: '1', values: []},
      {param: 'subject-cover', valueType: 'number', defaultValue: '0', min: '0', max: '1', values: []},
      {param: 'gapopen', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'gapextend', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'seed_ortholog_evalue', valueType: 'number', defaultValue: '0.001', min: '0', max: '10', values: []},
      {param: 'seed_ortholog_score', valueType: 'number', defaultValue: '60.0', min: '-1', max: '-1', values: []},
      {param: 'm', valueType: 'enum', defaultValue: 'diamond', min: '-1', max: '-1',
        values: ['diamond', 'hmmer']},
    ], "param")
  },
  {dbitem: 'hmmscan', options: sortBy([
      {param: 'T', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'domE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'domT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'incE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'incT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'incdomE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'incdomT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'F1', valueType: 'number', defaultValue: '0.02', min: '-1', max: '-1', values: []},
      {param: 'F2', valueType: 'number', defaultValue: '0.001', min: '-1', max: '-1', values: []},
      {param: 'F3', valueType: 'number', defaultValue: '0.00001', min: '-1', max: '-1', values: []},
      {param: 'nobias', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'nonull2', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'Z', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'domZ', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'seed', valueType: 'int', defaultValue: '42', min: '-1', max: '-1', values: []},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.01', min: '-1', max: '-1', values: []},
      {param: 'cut_ga', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'cut_nc', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'cut_tc', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
    ], "param")
  },
  {dbitem: 'hmmsearch', options: sortBy([
      {param: 'T', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'domE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'domT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'incE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'incT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'incdomE', valueType: 'evalue', defaultValue: '10', min: '0.0', max: '10.0', values: []},
      {param: 'incdomT', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'F1', valueType: 'number', defaultValue: '0.02', min: '-1', max: '-1', values: []},
      {param: 'F2', valueType: 'number', defaultValue: '0.001', min: '-1', max: '-1', values: []},
      {param: 'F3', valueType: 'number', defaultValue: '0.00001', min: '-1', max: '-1', values: []},
      {param: 'nobias', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'nonull2', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'Z', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'domZ', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'seed', valueType: 'int', defaultValue: '42', min: '-1', max: '-1', values: []},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.01', min: '-1', max: '-1', values: []},
      {param: 'cut_ga', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'cut_nc', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'cut_tc', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
    ], "param")
  },
  {dbitem: 'diamond blastp', options: sortBy([
      {param: 'strand', valueType: 'enum', defaultValue: 'both', min: '-1', max: '-1', values: ['both', 'minus', 'plus']},
      {param: 'min-score', valueType: 'number', defaultValue: '20', min: '0', max: undefined, values: []},
      {param: 'id', valueType: 'number', defaultValue: '0.0', min: '0', max: '100', values: []},
      {param: 'query-cover', valueType: 'number', defaultValue: '0.0', min: '0', max: '100', values: []},
      {param: 'subject-cover', valueType: 'number', defaultValue: '0.0', min: '0', max: '100', values: []},
      {param: 'sensitive', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'more-sensitive', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'block-size', valueType: 'number', defaultValue: '2.0', min: '-1', max: '-1', values: []},
      {param: 'gapopen', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'gapextend', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'frameshift', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'matrix', valueType: 'enum', defaultValue: 'BLOSUM62', min: '-1', max: '-1',
        values: ['BLOSUM62', 'BLOSUM90', 'BLOSUM80', 'BLOSUM50', 'BLOSUM45', 'PAM250', 'PAM70', 'PAM30']},
      {param: 'comp-based-stats', valueType: 'enum', defaultValue: '1', min: '-1', max: '-1', values: [0, 1]},
      {param: 'masking', valueType: 'enum', defaultValue: '1', min: '-1', max: '-1', values: [0, 1]},
      {param: 'algo', valueType: 'enum', defaultValue: '0', min: '-1', max: '-1', values: [0, 1]},
      {param: 'freq-sd', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'id2', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'window', valueType: 'int', defaultValue: '3', min: '-1', max: '-1', values: []},
      {param: 'xdrop', valueType: 'int', defaultValue: '4', min: '-1', max: '-1', values: []},
      {param: 'ungapped-score', valueType: 'number', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'hit-band', valueType: 'string', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'hit-score', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'gapped-xdrop', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'band', valueType: 'string', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'shapes', valueType: 'int', defaultValue: '0', min: '-1', max: '-1', values: []},
      {param: 'shape-mask', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'index-mode', valueType: 'enum', defaultValue: '0', min: '-1', max: '-1', values: [0, 1]},
      {param: 'rank-ratio', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'rank-ratio2', valueType: 'none', defaultValue: '', min: '-1', max: '-1', values: []},
      {param: 'max-hsps', valueType: 'int', defaultValue: '1', min: '-1', max: '-1', values: []},
      {param: 'range-cover', valueType: 'number', defaultValue: '0.0', min: '-1', max: '-1', values: []},
      {param: 'dbsize', valueType: 'int', defaultValue: '40000000', min: '-1', max: '-1', values: []},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.0', min: '-1', max: '-1', values: []},
    ], "param")
  }
];
