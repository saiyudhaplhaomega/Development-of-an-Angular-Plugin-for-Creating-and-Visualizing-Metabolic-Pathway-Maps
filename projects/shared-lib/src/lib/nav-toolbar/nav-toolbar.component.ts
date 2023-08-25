import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { UserToken } from '../login/user-token';

@Component({
  selector: 'shared-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit {
  @Input() applicationname: string = '';
  @Input() routerlinks: NavigationRoute[] = [];
  @Input() homelink: NavigationRoute = null;
  @Input() haslogin: Boolean = false;

  @Output() toggleSidenav = new EventEmitter<void>();
  user: UserToken;
  guest: boolean;

  constructor(private router: Router, public authService: AuthService) {}


  ngOnInit(): void {
    this.authService._user.subscribe((res) => {
      this.user = res;
    });
    this.authService._guest.subscribe((res) => {
      this.guest = res;
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

}
