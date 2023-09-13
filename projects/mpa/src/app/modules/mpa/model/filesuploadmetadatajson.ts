import { FileType } from "./filetype";
import { IonToleranceUnit } from "./search-parameters";

export interface FilesUploadMetadata {
    experimentID: String;
    protdbID: String;
    uploadType: String;
    peaklistFileType: FileType;
    searchResultFileType: FileType;
    fastaFileType: FileType;
    fragmentIonTolerance: number;
    precursorIonTolerance: number;
    fragmentIonToleranceUnit: IonToleranceUnit;
    precursorIonToleranceUnit: IonToleranceUnit;
}

export class FilesUploadMetadataJSON implements FilesUploadMetadata {
    experimentID: String;
    protdbID: String;
    uploadType: String;
    peaklistFileType: FileType;
    searchResultFileType: FileType;
    fastaFileType: FileType;
    fragmentIonTolerance: number;
    precursorIonTolerance: number;
    fragmentIonToleranceUnit: IonToleranceUnit;
    precursorIonToleranceUnit: IonToleranceUnit;
}