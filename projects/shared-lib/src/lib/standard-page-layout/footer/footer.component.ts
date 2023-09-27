import { Component, Input } from '@angular/core';
import { NestedNavigationRoute } from '../nav-toolbar/navigation-route.model';

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
  @Input() footerContent: NestedNavigationRoute[];

  copyRight = '2023. ISAS e.V.';

  panelOpenState = false;
}
