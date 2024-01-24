import { Feature, FeatureProfile } from '../workflow/models/classifier.model';

export interface WrapperResponse {
  wrapperJobId?: string;
  wrapperPanel: string;
  wrapperSingleMolecule: string;
  featureSelection: Feature[];
  featureSelectionProfiles: FeatureProfile[];
}
