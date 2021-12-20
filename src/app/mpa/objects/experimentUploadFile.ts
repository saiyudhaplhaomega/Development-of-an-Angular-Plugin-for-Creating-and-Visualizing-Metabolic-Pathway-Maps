import {Endpoints} from '../../core/services/webserveraddress.service';

export enum UploadFileTypes {
  MGF = 'MGF',
  MZML = 'MZML',
  MASCOT_DAT = 'Mascot-DAT',
  MZIDENT = 'MZIdentML',
  MASCOT_FASTA = 'MASCOT_FASTA'
}

export function UploadFileTypeToEndpoints(type: UploadFileTypes): {metaDataEndpoint: Endpoints, uploadEndpoint: Endpoints} {

  let metaDataEndpoint;
  let uploadEndpoint;

  switch (type) {
    case UploadFileTypes.MGF:
    case UploadFileTypes.MZML:
    case UploadFileTypes.MZIDENT:
    case UploadFileTypes.MASCOT_DAT:
    case UploadFileTypes.MASCOT_FASTA:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
      uploadEndpoint = Endpoints.SEARCH_UPLOAD;
      break;
      // TODO: prophane, proteinloader etc.
  }

  return {metaDataEndpoint: metaDataEndpoint, uploadEndpoint: uploadEndpoint};
}
