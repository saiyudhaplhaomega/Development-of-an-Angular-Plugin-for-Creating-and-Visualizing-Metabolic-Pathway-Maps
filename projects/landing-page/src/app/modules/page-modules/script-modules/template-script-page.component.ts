import { Component } from '@angular/core';

@Component({
  selector: 'template-script-page',
  templateUrl: './template-script-page.component.html',
  styleUrls: ['./template-script-page.component.scss'],
})
export class TemplateScriptComponent {
  goToLink(url: string): void {
    window.open(url, "_blank");
  }
  constructor() {}

  ngOnInit(): void {}
}
