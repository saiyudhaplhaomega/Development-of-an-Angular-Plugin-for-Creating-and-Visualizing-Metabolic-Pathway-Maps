import { Component, Input, OnInit } from '@angular/core';

enum Format {
  JPG = '.jpg',
  PNG = '.png',
  HTML = '.html',
}
@Component({
  selector: 'shared-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss'],
})
export class ResultDisplayComponent implements OnInit {
  @Input() imageLink: string;

  hasHtml: boolean = true;

  ngOnInit(): void {
    this.hasHtml = this.checkHtml();
  }

  checkHtml(): boolean {
    if (this.imageLink.endsWith(Format.HTML)) {
      return true;
    }
    return false;
  }
}
