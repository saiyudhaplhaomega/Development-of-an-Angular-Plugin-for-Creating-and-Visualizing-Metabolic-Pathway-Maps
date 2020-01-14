import {ProphaneReportStyle} from '../components/prophane-job-submission/prophane-job-submission-formdata';
import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';

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
export const selectedOptionString = [
  {param: 'header', valueType: 'none', defaultValue: ''},
  {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
  {param: 'top', valueType: 'number', defaultValue: '0.0'}];

export const annotationTasks: ProphaneAnnotationTaskObject[] =
  [
    {
      scope: 'Function', database: 'eggnog', databaseversion: 'latest', algorithm: 'emapper',
      optionstring: '-m diamond', evalue: '0.01', tasklabel: 'Functional Annotation Task 1'
    },
    {
      scope: 'Taxonomy', database: 'ncbi_nr', databaseversion: 'latest', algorithm: 'diamond blastp',
      optionstring: '--more-sensitive', evalue: '0.01', tasklabel: 'Taxonomic Annotation Task 1'
    }];

export const evalueOptions: object[] = [
  {id: 0, numerical: '0.01', text: 'Relaxed'},
  {id: 1, numerical: '0.001', text: 'Mid-Range'},
  {id: 2, numerical: '0.0005', text: 'Strict'}
];

export const contaminationdata: ProphaneContaminationOptionObject[] = [
  {id: 0, name: 'accessions starting with', valueString: 'start', label: '', regex: ''},
  {id: 1, name: 'accessions ending with', valueString: 'end', label: '', regex: ''},
  {id: 2, name: 'accessions matching to', valueString: 'regex', label: '', regex: ''},
  {id: 3, name: 'none', valueString: 'none', label: '', regex: ''}
];

export const optionStrings: object[] = [
  {dbitem: 'emapper', options: [
      {param: 'guessdb', valueType: 'none', defaultValue: ''},
      {param: 'tax_scope', valueType: 'none', defaultValue: ''},
      {param: 'target_orthologs', valueType: 'enum', defaultValue: 'one2one',
        values: ['one2one', 'many2one', 'one2many', 'many2many', 'all']},
      {param: 'go_evidence', valueType: 'enum', defaultValue: 'experimental',
        values: ['experimental', 'non-electronic']},
      {param: 'hmm_maxhits', valueType: 'int', defaultValue: '1'},
      {param: 'hmm_evalue', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0'},
      {param: 'hmm_score', valueType: 'number', defaultValue: '0.0'},
      {param: 'hmm_maxseqlen', valueType: 'int', defaultValue: '1'},
      {param: 'hmm_qcov', valueType: 'number', defaultValue: '0.0'},
      {param: 'Z', valueType: 'int', defaultValue: '1'},
      {param: ' target_orthologs', valueType: 'enum', defaultValue: 'BLOSUM62',
        values: ['BLOSUM62', 'BLOSUM90', 'BLOSUM80', 'BLOSUM50', 'BLOSUM45', 'PAM250', 'PAM70', 'PAM30']},
      {param: 'gapopen', valueType: 'number', defaultValue: '0.0'},
      {param: 'gapextend', valueType: 'number', defaultValue: '0.0'},
      {param: 'seed_ortholog_evalue', valueType: 'number', defaultValue: '0.0'},
      {param: 'seed_ortholog_score', valueType: 'number', defaultValue: '0.0'},
      {param: 'm', valueType: 'enum', defaultValue: 'diamond',
        values: ['diamond', 'hmmer']},
    ]},
  {dbitem: 'hmmscan', options: [
      // TODO: this 'evalue' seems wrong
      {param: 'E', valueType: 'evalue', defaultValue: '0.01', min: '0.0', max: '1.0'},
      {param: 'T', valueType: 'number', defaultValue: '0.0'},
      {param: 'domE', valueType: 'number', defaultValue: '0.0'},
      {param: 'domT', valueType: 'number', defaultValue: '0.0'},
      {param: 'incE', valueType: 'number', defaultValue: '0.0'},
      {param: 'incT', valueType: 'number', defaultValue: '0.0'},
      {param: 'incdomE', valueType: 'number', defaultValue: '0.0'},
      {param: 'incdomT', valueType: 'number', defaultValue: '0.0'},
      {param: 'F1', valueType: 'number', defaultValue: '0.0'},
      {param: 'F2', valueType: 'number', defaultValue: '0.0'},
      {param: 'F3', valueType: 'number', defaultValue: '0.0'},
      {param: 'nobias', valueType: 'none', defaultValue: ''},
      {param: 'nonull2', valueType: 'none', defaultValue: ''},
      {param: 'Z', valueType: 'int', defaultValue: '1'},
      {param: 'domZ', valueType: 'int', defaultValue: '1'},
      {param: 'seed', valueType: 'int', defaultValue: '1'},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.01'},
      {param: 'cut_ga', valueType: 'none', defaultValue: ''},
      {param: 'cut_nc', valueType: 'none', defaultValue: ''},
      {param: 'cut_tc', valueType: 'none', defaultValue: ''}
    ]},

  {dbitem: 'diamond blastp', options: [
      {param: 'header', valueType: 'none', defaultValue: ''},
      {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
      {param: 'top', valueType: 'number', defaultValue: '0.0'},
      {param: 'range-culling', valueType: 'none', defaultValue: ''},
      {param: 'min-score', valueType: 'number', defaultValue: '0.0'},
      {param: 'id', valueType: 'number', defaultValue: '0.0'},
      {param: 'sensitive', valueType: 'none', defaultValue: ''},
      {param: 'more-sensitive', valueType: 'none', defaultValue: ''},
      {param: 'block-size', valueType: 'number', defaultValue: '0.0'},
      {param: 'index-chunks', valueType: 'int', defaultValue: '1'},
      {param: 'gapopen', valueType: 'number', defaultValue: '0.0'},
      {param: 'gapextend', valueType: 'number', defaultValue: '0.0'},
      {param: 'frameshift', valueType: 'number', defaultValue: '0.0'},
      {param: 'matrix', valueType: 'string', defaultValue: ''},
      {param: 'custom-matrix', valueType: 'string', defaultValue: ''},
      {param: 'lambda', valueType: 'number', defaultValue: '0.0'},
      {param: 'K', valueType: 'number', defaultValue: '0.0'},
      {param: 'comp-based-stats', valueType: 'enum', defaultValue: '0', values: [0, 1]},
      {param: 'masking', valueType: 'enum', defaultValue: '0', values: [0, 1]},
      {param: 'taxonmap', valueType: 'string', defaultValue: ''},
      {param: 'taxonlist', valueType: 'string', defaultValue: ''},
      {param: 'algo', valueType: 'enum', defaultValue: '0', values: [0, 1]},
      {param: 'bin', valueType: 'int', defaultValue: '1'},
      {param: 'min-orf', valueType: 'none', defaultValue: ''},
      {param: 'freq-sd', valueType: 'number', defaultValue: '0.0'},
      {param: 'id2', valueType: 'number', defaultValue: '0.0'},
      {param: 'window', valueType: 'number', defaultValue: '0.0'},
      {param: 'xdrop', valueType: 'number', defaultValue: '0.0'},
      {param: 'ungapped-score', valueType: 'number', defaultValue: '0.0'},
      {param: 'hit-band', valueType: 'string', defaultValue: ''},
      {param: 'hit-score', valueType: 'number', defaultValue: '0.0'},
      {param: 'gapped-xdrop', valueType: 'number', defaultValue: '0.0'},
      {param: 'band', valueType: 'string', defaultValue: ''},
      {param: 'shapes', valueType: 'int', defaultValue: '1'},
      {param: 'shape-mask', valueType: 'int', defaultValue: '1'},
      {param: 'index-mode', valueType: 'enum', defaultValue: '0', values: [0, 1]},
      {param: 'rank-ratio', valueType: 'none', defaultValue: ''},
      {param: 'rank-ratio2', valueType: 'none', defaultValue: ''},
      {param: 'max-hsps', valueType: 'int', defaultValue: '1'},
      {param: 'range-cover', valueType: 'number', defaultValue: '0.0'},
      {param: 'dbsize', valueType: 'int', defaultValue: '1'},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.0'},
      {param: 'query-cover', valueType: 'number', defaultValue: '0.0'},
      {param: 'max-target-seqs', valueType: 'int', defaultValue: '1'},
    ]}];
