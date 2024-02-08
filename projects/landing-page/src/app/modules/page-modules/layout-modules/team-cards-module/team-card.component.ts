import { Component, Input } from '@angular/core';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() teamName: string = '';
  @Input() groupFoto: string = '';
  @Input() teamDescription: string = '';
  @Input() keywords: string = '';

  goToLink(url: string): void {
    window.open(url, "_blank");
  }

}
