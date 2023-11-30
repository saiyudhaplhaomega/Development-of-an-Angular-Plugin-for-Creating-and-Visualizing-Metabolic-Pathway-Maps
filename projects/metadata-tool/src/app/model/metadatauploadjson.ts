import { MetadataJson } from "./metadata-columnData";

export interface MetaDataUploadJson {
  jobId: string;
  createInitialMetadataJobId: string;
  fileConversionJobId: string;
  processingFinished: boolean;
  metadataJson: MetadataJson[];
  //dataFilesIDs: Map<string, string>;
  processingPipeline: string;
}

export class MetaDataUploadJsonObject implements MetaDataUploadJson {
  jobId: string;
  createInitialMetadataJobId: string;
  fileConversionJobId: string;
  processingFinished: boolean;
  metadataJson: MetadataJson[];
  //dataFilesIDs: Map<string, string>;
  processingPipeline: string;
}
