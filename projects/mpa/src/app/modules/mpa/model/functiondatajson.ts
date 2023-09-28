export class ECObject {
    id: string;
    description: string;
    //proteinids: [];
}

export class KOObject {
    id: string;
    description: string;
    //proteinids: [];
}

export interface FunctionDataJSON {
    ec?: ECObject;
    ko?: KOObject;
}

export class FunctionDataJSONObject implements FunctionDataJSON {
    ec?: ECObject;
    ko?: KOObject;
}