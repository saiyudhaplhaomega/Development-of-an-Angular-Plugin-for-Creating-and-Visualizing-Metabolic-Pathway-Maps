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

  // TODO: this here might be completely pointless
  switch (type) {
    case UploadFileTypes.MGF:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
    case UploadFileTypes.MZML:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
    case UploadFileTypes.MZIDENT:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
    case UploadFileTypes.MASCOT_DAT:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
    case UploadFileTypes.MASCOT_FASTA:
      metaDataEndpoint = Endpoints.SEARCH_METADATA;
      break;
      // TODO: prophane, proteinloader etc.
  }

  return metaDataEndpoint;
}
