import { Component, Input } from '@angular/core';

@Component({
  selector: 'overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss'],
})
export class OverviewCardComponent {
  @Input() toolName: string = '';
  @Input() toolLogo: string = '';
  @Input() toolDescription: string = '';
  @Input() backLink: string = '#'; 
  @Input() backLinkText: string = ''
  @Input() data: any[] = [];
  @Input() developers: { name: string; email: string; link: string; affiliation: string}[];
  @Input() updates: any[];
  goToLink(url: string): void {
    window.open(url, "_blank");
  }

  displayedColumns: string[] = ['inputs', 'outputs'];

  getOutputs(outputs: string[]): string {
    return outputs.join(', ');
  }
}
