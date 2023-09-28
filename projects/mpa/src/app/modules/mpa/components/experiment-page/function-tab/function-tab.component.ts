import { Component } from '@angular/core';
import { UniProtKeyword } from '../../../model/keywordjson';

@Component({
  selector: 'app-function-tab',
  templateUrl: './function-tab.component.html',
  styleUrls: ['./function-tab.component.scss']
})
export class FunctionTabComponent {

  keywords: UniProtKeyword[];
}
