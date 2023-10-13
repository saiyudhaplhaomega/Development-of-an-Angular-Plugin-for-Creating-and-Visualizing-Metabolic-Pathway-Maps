export interface Feature {
  featureID: string;
}

export interface FeatureProfile {
  profileID: string;
  features: Feature[];
}

export interface ClassifierConfig {
  classifierJobId: string;
  selectedFeatures: Feature[];
}

export class ClassifierConfig implements ClassifierConfig {
  constructor() {}
}
