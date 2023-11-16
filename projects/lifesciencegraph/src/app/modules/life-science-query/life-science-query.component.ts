import { Component } from '@angular/core';
import { LifeScienceQueryService } from './life-science-query.service';


@Component({
  selector: 'app-life-science-query',
  templateUrl: './life-science-query.component.html',
  styleUrls: ['./life-science-query.component.scss']
})
export class LifeScienceQueryComponent {

  constructor(private queryService: LifeScienceQueryService) {}

  queryValue: string = "";

  submit() {
    console.log("submitting a query: " + this.queryValue);
    this.queryService.submitQuery(this.queryValue);
  }

}
