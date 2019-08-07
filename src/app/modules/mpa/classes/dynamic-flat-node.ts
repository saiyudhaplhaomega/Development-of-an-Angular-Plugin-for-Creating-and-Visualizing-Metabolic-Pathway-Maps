import { MPAData } from "../interfaces/mpadata";

/** Flat node with expandable and level information */
export class DynamicFlatNode {
    constructor(public id, public level = 1, public expandable = false, public isLoading = false) {}
}