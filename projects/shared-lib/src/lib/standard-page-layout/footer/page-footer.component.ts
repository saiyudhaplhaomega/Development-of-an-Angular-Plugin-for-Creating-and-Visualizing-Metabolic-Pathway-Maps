import { Component, OnInit, Input } from '@angular/core';
import { UserToken } from '../login/user-token';
import { AuthService } from '../login/auth.service';


export class FooterContentMain {
  categoryname: string;
  elements: FooterContentSubElement[];
}

export class FooterContentSubElement {
  name: string = '';
  href?: string = null;
  routerlink?: string = null;
}

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.css'],
})
export class FooterComponent {
  @Input() footercontent: FooterContentMain[] = [];

}
