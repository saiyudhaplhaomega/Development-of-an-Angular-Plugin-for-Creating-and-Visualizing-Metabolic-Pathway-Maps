export interface TaxonomyJSON {
  id: string;
  rank: string;
  scientificname: string;
  othernames?: string[];
  children: TaxonomyJSON[];
  proteinIds?: string[];
  displayed: boolean;
}

export class TaxonomyObject implements TaxonomyJSON {
  id: string;
  rank: string;
  scientificname: string;
  othernames?: string[];
  children: TaxonomyJSON[];
  proteinIds?: string[];
  displayed: boolean = true;
}

