import { Component } from '@angular/core';

@Component({
  selector: 'prophane-page',
  templateUrl: './prophane.component.html',
  styleUrls: ['./prophane.component.scss'],
})
export class ProphaneComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
