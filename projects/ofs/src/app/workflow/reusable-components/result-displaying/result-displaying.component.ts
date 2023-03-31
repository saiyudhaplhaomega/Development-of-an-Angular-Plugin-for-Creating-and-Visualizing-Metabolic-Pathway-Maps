import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ofs-result-displaying',
  templateUrl: './result-displaying.component.html',
  styleUrls: ['./result-displaying.component.scss'],
})
export class ResultDisplayingComponent implements OnInit {
  @Input() imageLinks: null | string[];
  @Input() isLoading: Boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
