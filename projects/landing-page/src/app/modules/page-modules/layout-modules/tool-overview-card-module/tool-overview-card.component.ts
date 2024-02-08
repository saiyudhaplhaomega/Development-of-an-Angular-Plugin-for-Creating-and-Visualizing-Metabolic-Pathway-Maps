import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool-overview-card',
  templateUrl: './tool-overview-card.component.html',
  styleUrls: ['./tool-overview-card.component.scss'],
})
export class ToolOverviewCardComponent {
  @Input() toolName: string = '';
  @Input() toolLogo: string = '';
  @Input() toolDescription: string = '';
  @Input() backLink: string = '#'; 
  @Input() backLinkText: string = ''
  @Input() data: any[] = [];
  @Input() developers: { name: string; email: string; link: string; affiliation: string, role: string}[];
  @Input() mentions: { name: string; email: string; link: string; affiliation: string, role: string}[];
  @Input() updates: any[];
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
}
