import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-example-content',
  templateUrl: './test-example-content.component.html',
  styleUrls: ['./test-example-content.component.scss']
})
export class TestExampleContentComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.log("Init Content Page");
  }

}
