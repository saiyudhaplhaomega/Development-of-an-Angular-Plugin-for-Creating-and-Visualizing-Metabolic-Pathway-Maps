import { Component, Input } from '@angular/core';

@Component({
  selector: 'member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member: any;

  goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
