export class taxNode {
    id: string;
    description: string;
    children: taxNode[];
    //proteinids: string[];

    //solely for front-end purposes (i.e. filtering)
    displayed: boolean = true;
  }
  export interface TaxonomyTreeJSON {
    rootNode: taxNode;
  }
  
  export class TaxonomyTreeJSONObject implements TaxonomyTreeJSON {
    rootNode: taxNode;
  }