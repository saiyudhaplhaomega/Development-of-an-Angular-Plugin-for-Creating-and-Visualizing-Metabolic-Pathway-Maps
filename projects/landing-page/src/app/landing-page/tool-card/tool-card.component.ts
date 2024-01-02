import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool-card',
  templateUrl: './tool-card.component.html',
  styleUrls: ['./tool-card.component.scss'],
})
export class ToolCardComponent {
  @Input() toolData: any;

  goToLink(url: string): void {
    window.open(url, "_blank");
  }
}
