import { MPAData } from '../interfaces/mpadata';

export class Experiment implements MPAData {
    type = 'experiment';
    icon = 'computer';
    constructor(public name: string, public uuid: string, public children: number[]) {
    }
}
