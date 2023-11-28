import { ColumnData } from "./metadata-columnData";

export interface MetaDataUploadJson {
  jobId: string;
  createInitialMetadataJobId: string;
  fileConversionJobId: string;
  processingFinished: boolean;
  metadataJson: ColumnData[];
  dataFilesIDs: Map<string, string>;
}

export class MetaDataUploadJsonObject implements MetaDataUploadJson {
  jobId: string;
  createInitialMetadataJobId: string;
  fileConversionJobId: string;
  processingFinished: boolean;
  metadataJson: ColumnData[];
  dataFilesIDs: Map<string, string>;
}
