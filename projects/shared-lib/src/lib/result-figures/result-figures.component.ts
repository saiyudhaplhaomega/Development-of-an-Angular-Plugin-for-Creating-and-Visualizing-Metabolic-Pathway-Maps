import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-result-figures',
  templateUrl: './result-figures.component.html',
  styleUrls: ['./result-figures.component.scss'],
})
export class ResultFiguresComponent implements OnInit {
  @Input() imageLinks: null | string[];
  @Input() tabLables: string[] = [''];
  @Input() isLoading: Boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
