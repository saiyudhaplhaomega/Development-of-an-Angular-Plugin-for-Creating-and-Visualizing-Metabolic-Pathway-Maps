import { Component } from '@angular/core';

@Component({
  selector: 'mdoa-team-page',
  templateUrl: './mdoa-team.component.html',
  styleUrls: ['./mdoa-team.component.scss'],
})
export class MdoaTeamComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
