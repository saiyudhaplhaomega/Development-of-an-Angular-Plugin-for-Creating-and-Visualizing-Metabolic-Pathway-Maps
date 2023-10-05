export enum UniProtKeywordCategories {
    BIOLOGICAL_PROCESS = 'Biological Process',
    CELLULAR_COMPONENT = 'Cellular Component',
    CODING_SEQUENCE_DIVERSITY = 'Coding Sequence Diversity',
    DEVELOPMENTAL_STAGE = 'Developmental Stage',
    DISEASE = 'Disease',
    DOMAIN = 'Domain',
    LIGAND = 'Ligand',
    MOLECULAR_FUNCTION = 'Molecular Function',
    POST_TRANSLATIONAL_MODIFICATION = 'Post-Translational Modification',
    TECHNICAL_TERM = 'Technical Term',
}

export class UniProtKeyword {
    category: UniProtKeywordCategories;
    description: string;
    //proteinids: [];
}

export interface KeywordJSON {
    keywords: UniProtKeyword[]
}

export class KeywordJSONObject implements KeywordJSON {
    keywords: UniProtKeyword[];
}