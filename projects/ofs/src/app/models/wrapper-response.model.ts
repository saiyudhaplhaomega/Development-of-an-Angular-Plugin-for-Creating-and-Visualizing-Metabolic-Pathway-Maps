import { Feature, FeatureProfile } from "../workflow/models/classifier.model";

export interface WrapperResponse {
  wrapperJobName: string;
  wrapperPanel: string;
  wrapperSingleMolecule: string;
  featureSelection: Feature[]
  featureSelectionProfiles: FeatureProfile[];
}
