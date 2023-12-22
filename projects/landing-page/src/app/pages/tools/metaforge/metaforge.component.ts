import { Component } from '@angular/core';

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
