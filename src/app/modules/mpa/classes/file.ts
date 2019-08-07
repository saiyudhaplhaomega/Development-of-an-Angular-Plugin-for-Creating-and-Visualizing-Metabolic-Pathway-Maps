import { MPAData } from "../interfaces/mpadata";

export class File implements MPAData {
    type = 'file';
    name = 'File';
    icon = 'insert_drive_file';
    children = [];
    constructor(public uuid: string) {}
}