export interface Logo {
  label: string;
  assetPath: string;
  href?: string;
  backgroundColor?: string; // for dark logos on dark background, use bright text color for contrast
}
