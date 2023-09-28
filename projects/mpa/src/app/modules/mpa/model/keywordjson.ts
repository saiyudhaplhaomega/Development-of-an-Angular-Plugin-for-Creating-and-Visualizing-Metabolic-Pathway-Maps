export enum UniProtKeywordCategories {
    BIOLOGICAL_PROCESS = 'biological process',
    CELLULAR_COMPONENT = 'cellular component',
    CODING_SEQUENCE_DIVERSITY = 'coding sequence diversity',
    DEVELOPMENTAL_STAGE = 'developmental stage',
    DISEASE = 'disease',
    DOMAIN = 'domain',
    LIGAND = 'ligand',
    MOLECULAR_FUNCTION = 'molecular function',
    POST_TRANSLATIONAL_MODIFICATION = 'post-translational modification',
    TECHNICAL_TERM = 'technical term',
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