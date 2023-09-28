import { trigger, state, style, transition, animate } from '@angular/animations';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Input } from '@angular/core';
import { taxNode, TaxonomyTreeJSONObject } from '../../../model/taxonomytreejson';

@Component({
  selector: 'app-taxonomy-tab',
  templateUrl: './taxonomy-tab.component.html',
  styleUrls: ['./taxonomy-tab.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ visibility: 'hidden', height: 0, opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ])
  ]
})
export class TaxonomyTabComponent implements OnInit {

  @Input() experimentUUID: string;

  //TODO delete mock-data
  taxonomyNodes: TaxonomyTreeJSONObject;
  hasTaxNodes: boolean
  filterString: string;

  dataSource: ArrayDataSource<taxNode>;
  treeControl: NestedTreeControl<taxNode>;

  constructor() {
    this.taxonomyNodes = new TaxonomyTreeJSONObject();
    this.taxonomyNodes.rootNode = {
      id: '0',
      description: 'root',
      children: [
        {
          id: '1', description: 'Fruit', children: [
            {
              id: '3', description: 'Apple', children: [
                {
                  id: '3', description: 'Apple2', children: [
                    { id: '9', description: 'wurst', children: [], displayed: true },
                    { id: '9', description: 'Apple3', children: [], displayed: true }
                  ], displayed: true
                },
                { id: '9', description: 'Cucumber', children: [], displayed: true }
              ], displayed: true
            },
            { id: '4', description: 'Banana', children: [], displayed: true },
            { id: '5', description: 'Peach', children: [], displayed: true }
          ], displayed: true
        },
        {
          id: '2', description: 'Vegetables', children: [
            {
              id: '6', description: 'Seasonal', children: [
                {
                  id: '8', description: 'Fall', children: [
                    { id: '8', description: 'Pumpkin', children: [], displayed: true },
                    { id: '8', description: 'Carrots', children: [], displayed: true }
                  ], displayed: true
                },
                { id: '8', description: 'Summer', children: [], displayed: true },
                { id: '9', description: 'Cucumber', children: [], displayed: true }
              ], displayed: true
            },
            {
              id: '7', description: 'Green', children: [
                { id: '8', description: 'Zucchini', children: [], displayed: true },
                { id: '9', description: 'Cucumber', children: [], displayed: true }
              ], displayed: true
            }
          ], displayed: true
        }
      ],
      displayed: true,
    };

    this.filterString = '';
    this.hasTaxNodes = true;

    this.dataSource = new ArrayDataSource(this.taxonomyNodes.rootNode.children);
    this.treeControl = new NestedTreeControl<taxNode>(node => node.children);
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: taxNode) => !!node.children && node.children.length > 0;

  applyFilter(): void {
    let nodes = this.taxonomyNodes.rootNode.children;
    for (let i in nodes) {
      this.filterChildren(nodes[i]);
    }
  }

  //TODO clean-up
  filterChildren(node: taxNode) {
    let regExp = new RegExp(this.filterString, 'i');
    let descendants = this.treeControl.getDescendants(node);
    if (regExp.test(node.description)) {
      node.displayed = true;
      descendants.map(desc => desc.displayed = true);

      //this section is to make sure matches in multiple sequential levels get considered and displayed (i.e. parent: Bacteria, child with children: Acidobacterioa)
      let descMatched = false;
      descendants.map(desc => regExp.test(desc.description) ? descMatched = true : '');
      if (descMatched) {
        this.treeControl.expand(node);
        this.treeControl.expandDescendants(node);
      } else {
        this.treeControl.collapse(node);
        this.treeControl.collapseDescendants(node);
      }
    } else {
      if (node.children.length > 0) {
        let descMatched = false;
        descendants.map(desc => regExp.test(desc.description) ? descMatched = true : '');
        if (descMatched) {
          node.displayed = true;
          this.treeControl.expand(node);
          for (let i in node.children) {
            this.filterChildren(node.children[i]);
          }
        } else {
          node.displayed = false;
          this.treeControl.collapse(node);
          this.treeControl.collapseDescendants(node);
        }
      } else {
        node.displayed = false;
      }
    }
  }
}