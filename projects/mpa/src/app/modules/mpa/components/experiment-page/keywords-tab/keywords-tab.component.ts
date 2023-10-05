import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { KeywordJSONObject, UniProtKeyword, UniProtKeywordCategories } from '../../../model/keywordjson';

@Component({
  selector: 'app-keywords-tab',
  templateUrl: './keywords-tab.component.html',
  styleUrls: ['./keywords-tab.component.scss']
})
export class KeywordsTabComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  keywordCategories = UniProtKeywordCategories;
  filterString: string;

  //TODO delete mock-data and move dataStructures into service-class
  keywordsJSON: KeywordJSONObject = new KeywordJSONObject();
  dataMap: Map<UniProtKeywordCategories, UniProtKeyword[]>;
  keyArray: UniProtKeywordCategories[];
  selectedKeyword: string;  //only use description -> multiple instances of keywords in different categories can all get highlighted -> granted they are otherwise equal?
  

  constructor() {
    this.keywordsJSON.keywords = [
      { category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc1' },
      { category: UniProtKeywordCategories.DISEASE, description: 'desc2' },
      { category: UniProtKeywordCategories.DISEASE, description: 'desc3' },
      { category: UniProtKeywordCategories.BIOLOGICAL_PROCESS, description: 'desc4' },
      { category: UniProtKeywordCategories.DISEASE, description: 'desc1' }

    ]
    this.dataMap = new Map<UniProtKeywordCategories, UniProtKeyword[]>();
    this.keyArray = [];
    this.selectedKeyword = '';
  }

  ngOnInit(): void {
    this.setKeywordTabData(this.keywordsJSON.keywords)
  }

  //TODO implement insertion into detail-component and display of that component
  keywordClicked(keyword: UniProtKeyword): void {
    this.selectedKeyword = keyword.description;
  }

  isSelectedKeyword(keyword: UniProtKeyword): boolean {
    return keyword.description == this.selectedKeyword;
  }

  setKeywordTabData(keywords: UniProtKeyword[]): void {
    // clear map and keyArray to prevent data duplication while filtering
    this.keyArray = [];
    this.dataMap.clear();

    for (let i in keywords) {
      let categoryArray = this.dataMap.get(keywords[i].category);
      if (categoryArray) {
        categoryArray.push(keywords[i]);
      } else {
        categoryArray = [keywords[i]];
      }
      categoryArray = this.sortKeywordTabData('category', categoryArray)
      this.dataMap.set(keywords[i].category, categoryArray);
    }

    this.dataMap.forEach((value, key) => {
      this.keyArray.push(key);
    })
  }

  sortKeywordTabData(sortBy: string, data: UniProtKeyword[]): UniProtKeyword[] {
    if (sortBy == 'category') {
      data.sort((a, b) => a.category.localeCompare(b.category));
      return data;
    } else if (sortBy == 'quant') {
      //TODO
      console.log('sortBy quant not implemented yet!')
      return []
    }
  }

  applyFilter(): void {
    let regExp = new RegExp(this.filterString, 'i');
    let newData = this.keywordsJSON.keywords.filter(keyword => regExp.test(keyword.description));
    this.setKeywordTabData(newData);
  }

  expandAll() {
    this.accordion.openAll();
  }

  collapseAll() {
    this.accordion.closeAll();
  }
}
