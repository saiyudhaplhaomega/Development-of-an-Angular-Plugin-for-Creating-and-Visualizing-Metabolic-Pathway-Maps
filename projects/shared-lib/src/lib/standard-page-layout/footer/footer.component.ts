import { Component, Input } from '@angular/core';

export class FooterContentMain {
  categoryName: string;
  elements: FooterContentSubElement[];
}

export class FooterContentSubElement {
  name: string = '';
  href?: string;
  routerLink?: string;
}

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() logoPath: string = undefined;
  @Input() footerContent: FooterContentMain[];

  panelOpenState = false;
}
