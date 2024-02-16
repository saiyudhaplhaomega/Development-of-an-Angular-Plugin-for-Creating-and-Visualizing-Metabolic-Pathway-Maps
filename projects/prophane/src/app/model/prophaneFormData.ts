import {ProphaneReportStyle, ProphaneReportStyleLabel} from '../modules/job-submission/components/prophane-job-submission-main/prophane-job-submission-formdata';
import {ProphaneAnnotationTaskObject} from './prophaneannotationtaskjson';
import {ProphaneContaminationOptionObject} from './prophaneContaminationOption';
import {ProphaneQuantDataObject} from './prophanequantificationdata';
import {sortBy} from 'lodash';
import {ProphaneDataBaseOption} from './databaseoptions';
import {ProphaneEvalueOptions} from './prophaneEvalueOptionsJson';
import {TaxonomyAdvandedOptionsJson} from './taxonomyAdvandedOptions';
import {ProphaneLcaObject} from './prophanelcadata';


export const jobLabelData = [
  {
    index: 0,
    stepperLabel: 'Input',
    cardHeader: 'Input',
    expertsOnly: false,
  },
  {
    index: 1,
    stepperLabel: 'Sample Grouping',
    cardHeader: 'Sample Grouping',
    expertsOnly: true,
  },
  {
    index: 2,
    stepperLabel: 'Quantification',
    cardHeader: 'Quantification Method',
    expertsOnly: true,
  },
  {
    index: 3,
    stepperLabel: 'Taxonomy',
    cardHeader: 'Taxonomic Annotation',
    expertsOnly: true,
  },
  {
    index: 4,
    stepperLabel: 'Function',
    cardHeader: 'Functional Annotation',
    expertsOnly: true,
  },
  {
    index: 5,
    stepperLabel: 'Custom Map',
    cardHeader: 'Custom Map Annotation',
    expertsOnly: true,
  },
  {
    index: 6,
    stepperLabel: 'LCA',
    cardHeader: 'Lowest Common Ancestor',
    expertsOnly: true,
  },
  {
    index: 7,
    stepperLabel: 'Submit',
    cardHeader: 'Summary',
    expertsOnly: false,
  },
];

export const prophaneReportStyles: ProphaneReportStyle[] = [
  {id: 0, name: 'MPA (single experiment)', valueString: 'mpa'},
  {id: 1, name: 'MPA (multiple experiments)', valueString: 'mpa_multisample'},
  {id: 2, name: 'Scaffold', valueString: 'scaffold'},
  {id: 3, name: 'Generic Format', valueString: 'generic'},
  {id: 4, name: 'MzTab', valueString: 'mztab'},
  {id: 5, name: 'MzIdent', valueString: 'mzident'},
  {id: 6, name: 'Proteome Discoverer protein group excel file', valueString: 'pd_xlsx'},
];

export const prophaneReportStyleLabels: ProphaneReportStyleLabel[] = [
  {id: 0, prependLabel: 'Report file', htmlInputLabel: 'Choose MPA file (.csv)', inputType: '.csv'},
  {id: 1, prependLabel: 'Report file', htmlInputLabel: 'Choose MPA file (.csv)', inputType: '.csv'},
  {id: 2, prependLabel: 'Report file', htmlInputLabel: 'Choose Scaffold file (.xls)', inputType: '.xls'},
  {id: 3, prependLabel: 'Report file', htmlInputLabel: 'Choose Generic Report file (.tsv, .txt)', inputType: '.tsv,.txt'},
  {id: 4, prependLabel: 'Report file', htmlInputLabel: 'Choose MzTab file (.mztab)', inputType: '.mztab'},
  {id: 5, prependLabel: 'Report file', htmlInputLabel: 'Choose MzIdent2.0 file (.mzid)', inputType: '.mzid'},
  {id: 6, prependLabel: 'Report file', htmlInputLabel: 'Choose Proteome Discoverer protein group excel file (.xlsx)', inputType: '.xlsx'},
];

export const quantdata: ProphaneQuantDataObject[] = [
  {id: 0, name: 'NSAF (normalized to longest metaprotein sequence)', valueString: 'max_nsaf'},
  {id: 1, name: 'NSAF (normalized to shortest metaprotein sequence)', valueString: 'min_nsaf'},
  {id: 2, name: 'NSAF (normalized to mean metaprotein sequence)', valueString: 'mean_nsaf'},
  {id: 3, name: 'Raw value (no normalization)', valueString: 'raw'},
];

export const databaseOptions: ProphaneDataBaseOption[] = [
  {id: 0, scope: 'Function', database: 'eggnog', name: 'EggNog', algorithm: ['emapper']},
  {id: 1, scope: 'Function', database: 'pfams', name: 'PFAMs', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 2, scope: 'Function', database: 'tigrfams', name: 'TIGRFAMs', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 3, scope: 'Function', database: 'foam', name: 'FOAM', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 4, scope: 'Function', database: 'dbcan', name: 'CAzY/dbCAN', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 5, scope: 'Function', database: 'resfams_full', name: 'ResFAMs (full)', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 6, scope: 'Function', database: 'resfams_core', name: 'ResFAMs (core)', algorithm: ['hmmscan', 'hmmsearch']},
  {id: 7, scope: 'Taxonomy', database: 'ncbi_nr', name: 'NCBI protein nr', algorithm: ['diamond blastp']},
  {id: 8, scope: 'Taxonomy', database: 'uniprot_complete', name: 'UniprotKB (Swiss-Prot & TrEMBL)', algorithm: ['diamond blastp']},
  {id: 9, scope: 'Taxonomy', database: 'uniprot_sp', name: 'Swiss-Prot', algorithm: ['diamond blastp']},
  {id: 10, scope: 'Taxonomy', database: 'uniprot_tr', name: 'TrEMBL', algorithm: ['diamond blastp']},
];

export const defaultOptionString = [
  {param: 'header', valueType: 'none', defaultValue: ''},
  {param: 'strand', valueType: 'enum', defaultValue: 'both', values: ['both', 'minus', 'plus']},
  {param: 'top', valueType: 'number', defaultValue: '0.0'}
];


export const evalueOptions: ProphaneEvalueOptions[] = [
  {id: 0, numerical: '0.01', text: 'Relaxed'},
  {id: 1, numerical: '0.001', text: 'Mid-Range'},
  {id: 2, numerical: '0.0005', text: 'Strict'}
];

export const contaminationdata: ProphaneContaminationOptionObject[] = [
  {id: 0, name: 'none', valueString: 'none', label: '', regex: ''},
  {id: 1, name: 'accessions starting with', valueString: 'start', label: '', regex: '', formLabel: 'Exclude accessions starting with...'},
  {id: 2, name: 'accessions ending with', valueString: 'end', label: '', regex: '', formLabel: 'Exclude accessions ending with...'},
  {id: 3, name: 'accessions matching with', valueString: 'regex', label: '', regex: '', formLabel: 'Exclude accessions matching with... (regular expression; PCRE)'},
];

export const algparams = {
  emapper: {
    name: 'emapper',
    options: sortBy([
      {param: 'guessdb', valueType: 'int', defaultValue: '131567', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'tax_scope', valueType: 'int', defaultValue: '131567', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'target_orthologs', valueType: 'enum', defaultValue: 'one2one', min: undefined, max: undefined, isDefault: '0',
        values: ['one2one', 'many2one', 'one2many', 'many2many', 'all'], avoid: []},
      {param: 'go_evidence', valueType: 'enum', defaultValue: 'experimental', min: undefined, max: undefined, isDefault: '0',
        values: ['experimental', 'non-electronic'], avoid: []},
      {param: 'hmm_maxhits', valueType: 'int', defaultValue: '1', min: '1', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.001', min: '0.0', max: undefined, values: [], isDefault: '1', avoid: []},
      {param: 'hmm_score', valueType: 'number', defaultValue: '20.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'hmm_maxseqlen', valueType: 'int', defaultValue: '5000', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'hmm_qcov', valueType: 'number', defaultValue: '0', min: '0', max: '1', values: [], isDefault: '0', avoid: []},
      {param: 'query-cover', valueType: 'number', defaultValue: '0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'subject-cover', valueType: 'number', defaultValue: '0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'gapopen', valueType: 'int', defaultValue: '0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'gapextend', valueType: 'int', defaultValue: '0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      //{param: 'seed_ortholog_evalue', valueType: 'number', defaultValue: '0.001', min: 0, max: undefined, values: [], isDefault: 0, avoid: []},
      {param: 'seed_ortholog_score', valueType: 'number', defaultValue: '60.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'm', valueType: 'enum', defaultValue: 'diamond', min: undefined, max: undefined, values: ['diamond', 'hmmer'], isDefault: '1', avoid: []},
      {param: 'Z', valueType: 'int', defaultValue: '40000000', min: '1', max: undefined, values: [], isDefault: '0', avoid: []},
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'm',
      valueType: 'enum',
      defaultValue: 'diamond',
      min: undefined,
      max: undefined,
      values: ['diamond', 'hmmer'],
      isDefault: '1',
      avoid: []
    }
  },
  hmmscan: {
    name: 'hmmscan',
    options: sortBy([
      {param: 'T', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incdomE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incdomT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F1', valueType: 'number', defaultValue: '0.02', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F2', valueType: 'number', defaultValue: '0.001', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F3', valueType: 'number', defaultValue: '0.00001', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'nobias', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'nonull2', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'Z', valueType: 'int', defaultValue: '', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domZ', valueType: 'int', defaultValue: '', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'seed', valueType: 'int', defaultValue: '42', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'E', valueType: 'evalue', defaultValue: '0.001', min: '0', max: undefined, values: [], isDefault: '1', avoid: ['cut_ga', 'cut_tc', 'cut_nc']},
      {param: 'cut_ga', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
      {param: 'cut_nc', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
      {param: 'cut_tc', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'T',
      valueType: 'number',
      defaultValue: '0.0',
      min: '0',
      max: undefined,
      values: [],
      isDefault: '0',
      avoid: [] }
  },
  hmmsearch: {
    name: 'hmmsearch',
    options: sortBy([
      {param: 'T', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incdomE', valueType: 'number', defaultValue: '10', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'incdomT', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F1', valueType: 'number', defaultValue: '0.02', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F2', valueType: 'number', defaultValue: '0.001', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'F3', valueType: 'number', defaultValue: '0.00001', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'nobias', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'nonull2', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'Z', valueType: 'int', defaultValue: '', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'domZ', valueType: 'int', defaultValue: '', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'seed', valueType: 'int', defaultValue: '42', min: '0', max: undefined, values: [], isDefault: '0', avoid: []},
      {param: 'E', valueType: 'evalue', defaultValue: '0.001', min: '0', max: undefined, values: [], isDefault: '1', avoid: ['cut_tc', 'cut_ga', 'cut_nc']},
      {param: 'cut_ga', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
      {param: 'cut_nc', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
      {param: 'cut_tc', valueType: 'none', defaultValue: '', min: undefined, max: undefined, values: [], isDefault: '0', avoid: ['E']},
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'T', valueType: 'number', defaultValue: '0.0', min: '0', max: undefined, values: [], isDefault: '0', avoid: []
    }
  },
  diamond_blastp: {
    name: 'diamond blastp',
    options: sortBy([
      {
        param: 'strand',
        valueType: 'enum',
        defaultValue: 'both',
        min: undefined,
        max: undefined,
        values: ['both', 'minus', 'plus'],
        isDefault: '0',
        avoid: []
      },
      {param: 'min-score', valueType: 'number', defaultValue: '20', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'id', valueType: 'number', defaultValue: '0.0', min: '0', max: '100',
      values: [], isDefault: '0', avoid: []},
      {param: 'query-cover', valueType: 'number', defaultValue: '0', min: '0', max: '100',
      values: [], isDefault: '0', avoid: []},
      {param: 'subject-cover', valueType: 'number', defaultValue: '0', min: '0', max: '100',
      values: [], isDefault: '0', avoid: []},
      {param: 'sensitive', valueType: 'none', defaultValue: '', min: undefined, max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'more-sensitive', valueType: 'none', defaultValue: '', min: undefined, max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'block-size', valueType: 'number', defaultValue: '2.0', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'gapopen', valueType: 'int', defaultValue: '0', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'gapextend', valueType: 'int', defaultValue: '0', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'frameshift', valueType: 'int', defaultValue: '0', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {
        param: 'matrix', valueType: 'enum', defaultValue: 'BLOSUM62', min: undefined, max: undefined,
        values: ['BLOSUM62', 'BLOSUM90', 'BLOSUM80', 'BLOSUM50', 'BLOSUM45', 'PAM250', 'PAM70', 'PAM30'], isDefault: '0', avoid: []
      },
      {param: 'comp-based-stats', valueType: 'enum', defaultValue: '1', min: undefined, max: undefined,
       values: ['0', '1'], isDefault: '0', avoid: []},
      {param: 'masking', valueType: 'enum', defaultValue: '1', min: undefined, max: undefined,
       values: ['0', '1'], isDefault: '0', avoid: []},
      {param: 'algo', valueType: 'enum', defaultValue: '0', min: undefined, max: undefined,
       values: ['0', '1'], isDefault: '0', avoid: []},
      {param: 'freq-sd', valueType: 'number', defaultValue: '', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'id2', valueType: 'number', defaultValue: '', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'window', valueType: 'int', defaultValue: '', min: '0', max: undefined,
       values: [], isDefault: '0', avoid: []},
      {param: 'xdrop', valueType: 'int', defaultValue: '', min: '1', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'ungapped-score', valueType: 'number', defaultValue: '', min: '0', max: undefined,
      values: [], isDefault: '0'},
      {param: 'hit-band', valueType: 'string', defaultValue: '', min: undefined, max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'hit-score', valueType: 'number', defaultValue: '', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'gapped-xdrop', valueType: 'int', defaultValue: '', min: '1', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'band', valueType: 'string', defaultValue: '', min: '-1', max: '-1',
      values: [], isDefault: '0', avoid: []},
      {param: 'shapes', valueType: 'int', defaultValue: '0', min: '0', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'shape-mask', valueType: 'int', defaultValue: '', min: '0', max: undefined,
       values: [], isDefault: '0', avoid: []},
      {param: 'index-mode', valueType: 'enum', defaultValue: '0', min: undefined, max: undefined,
       values: ['0', '1'], isDefault: '0', avoid: []},
      {param: 'rank-ratio', valueType: 'none', defaultValue: '', min: undefined, max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'rank-ratio2', valueType: 'none', defaultValue: '', min: undefined, max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'max-hsps', valueType: 'int', defaultValue: '1', min: '1', max: undefined,
       values: [], isDefault: '0', avoid: []},
      {param: 'dbsize', valueType: 'int', defaultValue: '40000000', min: '1', max: undefined,
      values: [], isDefault: '0', avoid: []},
      {param: 'evalue', valueType: 'evalue', defaultValue: '0.001', min: '0', max: undefined,
       values: [], isDefault: '1', avoid: []},
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'min-score',
      valueType: 'number',
      defaultValue: '20',
      min: '0',
      max: undefined,
      values: [],
      isDefault: '0',
      avoid: []
    }
  },
  acc2annot_mapper: {
    name: 'acc2annot_mapper',
    options: [
      {
        param: 'path',
        valueType: File,
        defaultValue: undefined,
        min: undefined,
        max: undefined,
        values: [],
        isDefault: '1',
        avoid: []
      },

    ], function (option) {
      return option.param.toLowerCase();
    },
    defaultOptionStringSelection: {
      param: 'path',
      valueType: File,
      defaultValue: undefined,
      min: undefined,
      max: undefined,
      values: [],
      isDefault: '1',
      avoid: []
    }
  }
};

function getAlgoData(algo, excluded_options) {
  const algodata = {...algparams[algo]};
  if (excluded_options.length > 0) {
    algodata['options'] = algodata['options'].filter(i => excluded_options.indexOf(i['param']) < 0);
  }
  return algodata;
};

export const optionStrings: TaxonomyAdvandedOptionsJson[] = [
  {database: 'ncbi_nr', algs: [getAlgoData('diamond_blastp', [])]},
  {database: 'uniprot_complete', algs: [getAlgoData('diamond_blastp', [])]},
  {database: 'uniprot_sp', algs: [getAlgoData('diamond_blastp', [])]},
  {database: 'uniprot_tr', algs: [getAlgoData('diamond_blastp', [])]},
  {database: 'eggnog', algs: [getAlgoData('emapper', [])]},
  {database: 'pfams', algs: [getAlgoData('hmmscan', []), getAlgoData('hmmsearch', [])]},
  {database: 'tigrfams', algs: [getAlgoData('hmmscan', []), getAlgoData('hmmsearch', [])]},
  {database: 'foam', algs: [getAlgoData('hmmscan', ['cut_tc', 'cut_nc', 'cut_ga']), getAlgoData('hmmsearch', ['cut_tc', 'cut_nc', 'cut_ga'])]},
  {database: 'resfams_full', algs: [getAlgoData('hmmscan', ['cut_tc', 'cut_nc', 'cut_ga']), getAlgoData('hmmsearch', ['cut_tc', 'cut_nc', 'cut_ga'])]},
  {database: 'resfams_core', algs: [getAlgoData('hmmscan', ['cut_tc', 'cut_nc', 'cut_ga']), getAlgoData('hmmsearch', ['cut_tc', 'cut_nc', 'cut_ga'])]},
  {database: 'dbcan', algs: [getAlgoData('hmmscan', ['cut_tc', 'cut_nc', 'cut_ga']), getAlgoData('hmmsearch', ['cut_tc', 'cut_nc', 'cut_ga'])]},
  {database: 'custom_map', algs: [getAlgoData('acc2annot_mapper', [])]},
];

// chosen by default for "advanced" and not "advanced" users
export const defaultAnnotationTasks: ProphaneAnnotationTaskObject[] = [
  {
    scope: 'Function',
    database: 'eggnog',
    databaseversion: 'latest',
    algorithm: 'emapper',
    tasklabel: 'Functional Annotation Task 1',
    optionstring: optionStrings.filter(i => i['database'] === 'eggnog')[0]['algs'][0]['options'].filter(i => i['isDefault'] === '1'),
    formOptionStringSelection: optionStrings.filter(i => i['database'] === 'eggnog')[0]['algs'][0]['defaultOptionStringSelection'],
  },
  {
    scope: 'Taxonomy',
    database: 'ncbi_nr',
    databaseversion: 'latest',
    algorithm: 'diamond blastp',
    tasklabel: 'Taxonomic Annotation Task 1',
    optionstring: optionStrings.filter(i => i['database'] === 'ncbi_nr')[0]['algs'][0][
      'options'].filter(i => i['isDefault'] === '1'),
    formOptionStringSelection: optionStrings.filter(i => i['database'] === 'ncbi_nr')[0][
      'algs'][0]['defaultOptionStringSelection'],
  },

];

export const defaultCustomMapTask: ProphaneAnnotationTaskObject =
{
  scope: 'CustomMap',
  database: 'custom_map',
  databaseversion: '',
  algorithm: 'acc2annot_mapper',
  tasklabel: 'Custom Map Annotation Task 1',
  optionstring: optionStrings.filter(i => i['database'] === 'custom_map')[0]['algs'][0][
    'options'].filter(i => i['isDefault'] === '1'),
  formOptionStringSelection:  optionStrings.filter(i => i['database'] === 'custom_map')[0][
    'algs'][0]['defaultOptionStringSelection'],

}

export const CustomMapOptions: any =  {
  scope: ['Taxonomy', 'Function'],
  algorithm: ['acc2annot_mapper']
}
;

export const lcaParams = [
  {name: 'lca', options: sortBy([
      {
        param: 'threshold',
        valueType: 'number',
        defaultValue: '0.51',
        min: '0.1',
        max: '1',
        values: [],
        isDefault: '1',
        avoid: []},
      {
        param: 'minimum_number_of_annotations',
        valueType: 'int',
        defaultValue: '0',
        min: '0',
        max: '7',
        values: ['0', '1', '2', '3', '4', '5', '6', '7'],
        isDefault: '0',
        avoid: []},
      {
        param: 'ignore_unclassified',
        valueType: 'none',
        defaultValue: '',
        min: undefined,
        max: undefined,
        values: [],
        isDefault: '1',
        avoid: []}
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'threshold',
      valueType: 'number',
      defaultValue: '0.51',
      min: '0.1',
      max: '1',
      values: [],
      isDefault: '1',
      avoid: []}
  },
  {name: 'democratic_lca', options: sortBy([
      {
        param: 'minimum_number_of_annotations',
        valueType: 'int',
        defaultValue: '0',
        min: '0',
        max: '7',
        values: ['0', '1', '2', '3', '4', '5', '6', '7'],
        isDefault: '0',
        avoid: []},
      {
        param: 'ignore_unclassified',
        valueType: 'none',
        defaultValue: '',
        min: undefined,
        max: undefined,
        values: [],
        isDefault: '1',
        avoid: []},
    ], function (option) {
      return option.param.toLowerCase();
    }),
    defaultOptionStringSelection: {
      param: 'ignore_unclassified',
      valueType: 'none',
      defaultValue: '',
      min: undefined,
      max: undefined,
      values: [],
      isDefault: '1',
      avoid: []
    }
  }
];

export const lcaOptions: ProphaneLcaObject[] = [
  {
    method: 'lca',
    name: 'LCA per group',
    optionstring: [
      {
        param: 'threshold',
        valueType: 'number',
        defaultValue: '0.51',
        min: '0.1',
        max: '1',
        values: [],
        isDefault: '1',
        avoid: [],
      },
      {
      param: 'ignore_unclassified',
      valueType: 'none',
      defaultValue: '',
      min: undefined,
      max: undefined,
      values: [],
      isDefault: '1',
      avoid: [],
      }
    ],
    formOptionStringSelection: {
      param: 'minimum_number_of_annotations', valueType: 'int', defaultValue: '0', min: '0', max: '7',
      values: ['0', '1', '2', '3', '4', '5', '6', '7'], isDefault: '0', avoid: []},
  },
  {
    method: 'democratic_lca',
    name: 'democratic LCA',
    optionstring: [{
      param: 'ignore_unclassified',
      valueType: 'none',
      defaultValue: '',
      min: undefined,
      max: undefined,
      values: [],
      isDefault: '1',
      avoid: []}],
    formOptionStringSelection: {
      param: 'minimum_number_of_annotations', valueType: 'int', defaultValue: '0', min: '0', max: '7',
      values: ['0', '1', '2', '3', '4', '5', '6', '7'], isDefault: '0', avoid: []},
  },
];



export const defaultLcaTask: ProphaneLcaObject =
  lcaOptions.filter(i => i['method'] === 'lca')[0]

