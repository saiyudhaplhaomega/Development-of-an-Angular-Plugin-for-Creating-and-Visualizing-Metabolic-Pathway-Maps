import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { KeywordJSONObject, UniProtKeyword, UniProtKeywordCategories } from '../../../model/keywordjson';

@Component({
  selector: 'app-keywords-tab',
  templateUrl: './keywords-tab.component.html',
  styleUrls: ['./keywords-tab.component.scss']
})
export class KeywordsTabComponent implements OnInit {

  //TODO delete mock-data
  keywordsJSON: KeywordJSONObject = new KeywordJSONObject();

  //TODO fill tree with hierarchical data based on keywordsJSON
  dataSource: ArrayDataSource<UniProtKeyword>;
  //treeControl: FlatTreeControl<UniProtKeyword>;

  constructor() {
    this.keywordsJSON.keywords = [
      {category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc1'},
      {category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc2'},
      {category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc3'},                       
    ]

    this.dataSource = new ArrayDataSource(this.keywordsJSON.keywords)
    //TODO instanciate treeControl
   }

  ngOnInit(): void {
  }

}
