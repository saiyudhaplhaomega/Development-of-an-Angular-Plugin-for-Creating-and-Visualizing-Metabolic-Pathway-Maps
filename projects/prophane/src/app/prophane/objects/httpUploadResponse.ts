
export interface HttpUploadResponseJSON {
  message: string;
  success: string;
}

export class HttpUploadResponseObject implements HttpUploadResponseJSON {
  message: string;
  success: string;
}
