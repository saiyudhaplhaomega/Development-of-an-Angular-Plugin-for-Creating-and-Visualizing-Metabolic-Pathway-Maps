import { MPAData } from '../interfaces/mpadata';

export class Folder implements MPAData {
    type = 'folder';
    icon = 'folder';
    constructor(public children: number[], public name: string, public uuid: string) {}
}
