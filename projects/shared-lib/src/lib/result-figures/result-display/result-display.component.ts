import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css'],
})
export class ResultDisplayComponent {
  @Input() imageLink: string;
}
