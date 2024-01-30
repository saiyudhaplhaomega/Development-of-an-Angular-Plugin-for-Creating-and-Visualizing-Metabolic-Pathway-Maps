import { Component } from '@angular/core';

@Component({
  selector: 'r-page',
  templateUrl: './r.component.html',
  styleUrls: ['./r.component.scss'],
})
export class RComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
