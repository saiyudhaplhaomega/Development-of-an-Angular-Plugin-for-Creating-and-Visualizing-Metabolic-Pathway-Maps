export class TaxonomyNode {
    id: string;
    description: string;
    rank: string;
    children: TaxonomyNode[];
    //proteinids: string[];

    //solely for front-end purposes (i.e. filtering)
    displayed: boolean = true;
  }
  export interface TaxonomyTreeJSON {
    rootNode: TaxonomyNode;
  }

  export class TaxonomyTreeJSONObject implements TaxonomyTreeJSON {
    rootNode: TaxonomyNode;
  }
