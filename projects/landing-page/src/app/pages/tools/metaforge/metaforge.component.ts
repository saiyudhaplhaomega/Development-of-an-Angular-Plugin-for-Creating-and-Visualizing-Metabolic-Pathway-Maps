import { Component } from '@angular/core';
import { OverviewCardComponent } from '../../layout/overview-card.component';
@Component({
  selector: 'metaforge-page',
  templateUrl: './metaforge.component.html',
  styleUrls: ['./metaforge.component.scss'],
})
export class MetaForgeComponent {

  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
