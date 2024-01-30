import { Component } from '@angular/core';

@Component({
  selector: 'mpa-page',
  templateUrl: './mpa.component.html',
  styleUrls: ['./mpa.component.scss'],
})
export class MpaComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
