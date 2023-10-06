export enum FunctionIdentifier {
    EC = 'ec',
    KO = 'ko',
}
export class FunctionDataObject {
    id: string;
    type: FunctionIdentifier;
    description: string;
    //proteinids: [];
}

export interface FunctionDataJSON {
    functionData: FunctionDataObject[];
}

export class FunctionDataJSONObject implements FunctionDataJSON {
    functionData: FunctionDataObject[];
}