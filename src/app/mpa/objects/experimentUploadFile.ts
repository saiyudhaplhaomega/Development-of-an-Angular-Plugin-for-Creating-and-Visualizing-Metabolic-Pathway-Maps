import {Endpoints} from '../../core/services/webserveraddress.service';

export enum UploadFileTypes {
  MGF = 'MGF',
  MZML = 'MZML',
  DAT = 'Mascot-DAT',
  MZIDENT = 'MZIdentML',
  FASTA = 'FASTA'
}

export function UploadFileTypeToEndpoints(type: UploadFileTypes): {metaDataEndpoint: Endpoints, uploadEndpoint: Endpoints} {

  let metaDataEndpoint;
  let uploadEndpoint;

  switch (type) {
    case UploadFileTypes.MGF:
      metaDataEndpoint = Endpoints.POST_MGF_METADATA;
      uploadEndpoint = Endpoints.UPLOAD_MGF;
      break;
    case UploadFileTypes.MZML:
      metaDataEndpoint = Endpoints.POST_MZML_METADATA;
      uploadEndpoint = Endpoints.UPLOAD_MZML;
      break;
    case UploadFileTypes.MZIDENT:
      metaDataEndpoint = Endpoints.POST_MZIDENT_METADATA;
      uploadEndpoint = Endpoints.UPLOAD_MZIDENT;
      break;
    case UploadFileTypes.DAT:
      metaDataEndpoint = Endpoints.POST_DAT_METADATA;
      uploadEndpoint = Endpoints.UPLOAD_DAT;
      break;
    case UploadFileTypes.FASTA:
      // TODO: check fasta endpoints
      metaDataEndpoint = Endpoints.POST_FASTA_METADATA;
      uploadEndpoint = Endpoints.UPLOAD_FASTA;
      break;
  }

  return {metaDataEndpoint: metaDataEndpoint, uploadEndpoint: uploadEndpoint};
}
