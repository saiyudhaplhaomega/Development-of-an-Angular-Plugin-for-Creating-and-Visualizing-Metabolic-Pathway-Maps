export interface Feature {
  featureId: string;
}

export interface FeatureProfile {
  profileId: string;
  features: Feature[];
}

export interface ClassifierConfig {
  selectedFeatures: Feature[];
}
