import { MPAData } from "../interfaces/mpadata";

export class Search implements MPAData {
    type = 'search';
    name = 'Search Database';
    icon = 'search';
    children = [];
    constructor(public uuid: string) {}
}