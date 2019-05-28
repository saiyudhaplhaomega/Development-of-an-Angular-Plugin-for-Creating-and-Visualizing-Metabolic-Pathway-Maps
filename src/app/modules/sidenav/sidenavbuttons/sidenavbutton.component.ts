import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-button',
  templateUrl: './sidenavbutton.component.html',
  styleUrls: ['./sidenavbutton.component.css'],
})
export class SideNavButtonComponent {

  title = 'app';

  @Input()
  buttonlabel: string;
  @Input()
  redirectURL: string;

  constructor(private router: Router) { }

  onClick(): void {
    this.router.navigate([this.redirectURL]);
  }

}
