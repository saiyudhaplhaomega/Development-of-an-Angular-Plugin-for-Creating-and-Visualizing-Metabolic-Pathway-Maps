import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ofs-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  activeLink = 'interactions';
  links = ['interactions', 'pca', 'treeexplore'];

  constructor() {}

  ngOnInit(): void {}
}
