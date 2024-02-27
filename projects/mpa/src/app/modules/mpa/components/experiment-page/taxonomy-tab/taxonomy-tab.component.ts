import { trigger, state, style, transition, animate } from '@angular/animations';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Input } from '@angular/core';
import { TaxonomyJSON, TaxonomyObject } from '../../../model/taxonomyjson';
import { MpaTableDataService } from '../../../services/mpa-table-data.service';

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

  dataSource: ArrayDataSource<TaxonomyObject>;
  treeControl: NestedTreeControl<TaxonomyObject>;
  selectedTaxNode: TaxonomyObject;

  rootNode: TaxonomyObject;
  hasTaxNodes: boolean
  filterString: string;

  constructor(
    public mpaTableDataService: MpaTableDataService
  ) {
  }

  ngOnInit(): void {
    this.mpaTableDataService.taxonomyData.subscribe((newData) => {
      this.rootNode = newData;
    })
    this.filterString = '';
    this.hasTaxNodes = true;
    this.selectedTaxNode = new TaxonomyObject();

    this.dataSource = new ArrayDataSource(this.rootNode.children);
    this.treeControl = new NestedTreeControl<TaxonomyObject>(node => node.children);
  }

  hasChild = (_: number, node: TaxonomyObject) => !!node.children && node.children.length > 0;

  applyFilter(): void {
    let nodes = this.rootNode.children;
    for (let i in nodes) {
      this.filterChildren(nodes[i]);
    }
  }

  /**
   * Filters nodes based on scientificname and all other names
   * @param node 
   */
  filterChildren(node: TaxonomyJSON) {
    let regExp = new RegExp(this.filterString, 'i');
    let descendants = this.treeControl.getDescendants(node);
    if (regExp.test(node.scientificname)) {
      node.displayed = true;
      descendants.map(desc => desc.displayed = true);

      //this section is to make sure matches in multiple sequential levels get considered and displayed (i.e. parent: Bacteria, child with children: Acidobacterioa when 'bacte' is searched)
      let descMatched = false;
      descendants.map(desc => {
        let descNames: string[] = [desc.scientificname,...desc.othernames];
        for (let name in descNames) {
          if (regExp.test(name)) {
            descMatched = true;
            break;
          }
        }
      });
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
        descendants.map(desc => {
          let descNames: string [] = [desc.scientificname,...desc.othernames];
          for (let name in descNames) {
            if (regExp.test(name)) {
              descMatched = true;
              break;
            }
          }
        });
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

  // //TODO implement insertion into detail-view-component
  nodeClicked(node: TaxonomyJSON): void {
    !this.treeControl.isExpanded(node) ? this.treeControl.expand(node) : {};
    this.selectedTaxNode = node;
  }

  expandAll() {
    this.treeControl.expandDescendants(this.rootNode);
  }

  collapseAll() {
    this.treeControl.collapseDescendants(this.rootNode);
  }
}