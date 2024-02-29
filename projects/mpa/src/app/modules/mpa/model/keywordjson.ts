export enum UniProtKeywordCategory {
    BIOLOGICAL_PROCESS = 'Biological process',
    CELLULAR_COMPONENT = 'Cellular component',
    CODING_SEQUENCE_DIVERSITY = 'Coding sequence diversity',
    DEVELOPMENTAL_STAGE = 'Developmental stage',
    DISEASE = 'Disease',
    DOMAIN = 'Domain',
    LIGAND = 'Ligand',
    MOLECULAR_FUNCTION = 'Molecular function',
    POST_TRANSLATIONAL_MODIFICATION = 'PTM',
    TECHNICAL_TERM = 'Technical term',
}

export interface KeywordJSON {
    accession: string;
    id: string;
    category?: UniProtKeywordCategory;
    children?: KeywordJSON[];
    proteinIds?: string[];
    displayed: boolean;
}

export class KeywordObject implements KeywordJSON {
    accession: string;
    id: string;
    category?: UniProtKeywordCategory;
    children?: KeywordJSON[];
    proteinIds?: string[];
    displayed: boolean = true;
}