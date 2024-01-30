import { Component } from '@angular/core';

@Component({
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
