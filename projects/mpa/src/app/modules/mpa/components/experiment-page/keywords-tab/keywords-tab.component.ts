import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { KeywordJSONObject, UniProtKeyword, UniProtKeywordCategories } from '../../../model/keywordjson';

@Component({
  selector: 'app-keywords-tab',
  templateUrl: './keywords-tab.component.html',
  styleUrls: ['./keywords-tab.component.scss']
})
export class KeywordsTabComponent implements OnInit {

  //TODO implement buttons to open/close all expansion-panels with accordion
  @ViewChild(MatAccordion) accordion: MatAccordion;

  //TODO delete mock-data
  keywordsJSON: KeywordJSONObject = new KeywordJSONObject();
  dataMap: Map<UniProtKeywordCategories, UniProtKeyword[]>;
  keyArray: UniProtKeywordCategories[];
  keywordCategories = UniProtKeywordCategories;
  filterString: string;

  constructor() {
    this.keywordsJSON.keywords = [
      { category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc1' },
      { category: UniProtKeywordCategories.LIGAND, description: 'asdf' },
      { category: UniProtKeywordCategories.DISEASE, description: 'desc3' },
      { category: UniProtKeywordCategories.DISEASE, description: 'efef' },
      { category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'too' },
      { category: UniProtKeywordCategories.LIGAND, description: 'nnnv' }

    ]
    this.dataMap = new Map<UniProtKeywordCategories, UniProtKeyword[]>();
    this.keyArray = [];
  }

  ngOnInit(): void {
    // this.keywordsJSON.keywords.sort((a,b) => a.category.localeCompare(b.category));
    this.setData(this.keywordsJSON.keywords)
  }

  setData(keywords: UniProtKeyword[]): void {
    for (let i in keywords) {
      let categoryArray = this.dataMap.get(keywords[i].category);
      if (categoryArray) {
        categoryArray.push(keywords[i]);
      } else {
        categoryArray = [keywords[i]];
      }
      categoryArray = this.sortData('category',categoryArray)
      this.dataMap.set(keywords[i].category,categoryArray);
    }

    this.dataMap.forEach((value,key) => {
      this.keyArray.push(key);
    })
  }

  //TODO implement insertion into detail-component and display of that component
  keywordClicked(keyword: UniProtKeyword): void {
    console.log(keyword);
  }

  sortData(sortBy: string, data: UniProtKeyword[]): UniProtKeyword[] {
    if (sortBy == 'category') {
      data.sort((a,b) => a.category.localeCompare(b.category));
      return data;
    } else if (sortBy == 'quant') {
      //TODO
      console.log('sortBy quant not implemented yet!')
      return []
    }
  }

  //TODO implement
  applyFilter(): void {
   
  }
}
