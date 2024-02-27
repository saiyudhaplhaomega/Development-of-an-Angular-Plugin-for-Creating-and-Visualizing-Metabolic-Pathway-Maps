import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { KeywordJSON, KeywordObject, UniProtKeywordCategory } from '../../../model/keywordjson';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MpaTableDataService } from '../../../services/mpa-table-data.service';

@Component({
  selector: 'app-keywords-tab',
  templateUrl: './keywords-tab.component.html',
  styleUrls: ['./keywords-tab.component.scss']
})
export class KeywordsTabComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  dataSource: ArrayDataSource<KeywordObject>;
  treeControl: NestedTreeControl<KeywordObject>;

  keywordCategories = UniProtKeywordCategory;
  filterString: string;

  rootNode: KeywordObject;
  selectedKeyword: KeywordObject;
  
  constructor(
    public mpaTableDataService: MpaTableDataService
  ) {}

  ngOnInit(): void {
    this.mpaTableDataService.keywordData.subscribe((newData) => {
      this.rootNode = newData;
    })
    this.filterString = '';
    this.selectedKeyword = new KeywordObject();
    this.dataSource = new ArrayDataSource(this.rootNode.children);
    this.treeControl = new NestedTreeControl<KeywordObject>(node => node.children);
  }

  hasChild = (_: number, node: KeywordObject) => !!node.children && node.children.length > 0;
  isCategoryNode = (_:number,node: KeywordObject) => !node.category; // category-nodes shouldn't have a category assigned

  applyFilter(): void {
    let nodes = this.rootNode.children;
    for (let i in nodes) {
      this.filterChildren(nodes[i]);
    }
  }

  /**
   * Filters nodes based on accession and name/id
   * @param node 
   */
  filterChildren(node: KeywordJSON) {
    let regExp = new RegExp(this.filterString, 'i');
    let descendants = this.treeControl.getDescendants(node);
    if (regExp.test(node.id)) {
      node.displayed = true;
      descendants.map(desc => desc.displayed = true);

      //this section is to make sure matches in multiple sequential levels get considered and displayed (i.e. parent: Bacteria, child with children: Acidobacterioa when 'bacte' is searched)
      let descMatched = false;
      descendants.map(desc => {
        let options = [desc.id,desc.accession];
        for (let option in options) {
          if (regExp.test(option)) {
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
          let options = [desc.id,desc.accession];
          for (let option in options) {
            if (regExp.test(option)) {
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


  //TODO implement insertion into detail-component and display of that component
  nodeClicked(node: KeywordObject): void {
    !this.treeControl.isExpanded(node) ? this.treeControl.expand(node) : {};
    this.selectedKeyword = node;
  }

  expandAll() {
    this.treeControl.expandDescendants(this.rootNode);
  }

  collapseAll() {
    this.treeControl.collapseDescendants(this.rootNode);
  }

  expandCategory(categoryNode: KeywordObject) {
    this.treeControl.expandDescendants(categoryNode);
  }

  collapseCategory(categoryNode: KeywordObject) {
    this.treeControl.collapseDescendants(categoryNode);
  }
}
