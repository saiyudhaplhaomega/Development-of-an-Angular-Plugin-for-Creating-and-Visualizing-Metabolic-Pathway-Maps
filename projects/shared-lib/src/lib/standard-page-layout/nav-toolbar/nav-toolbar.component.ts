import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';
import { AuthService } from '../login/auth.service';
import { UserToken } from '../login/user-token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit, OnDestroy {
  @Input() applicationName: string = '';
  @Input() routerLinks: NavigationRoute[] = [];
  @Input() homeLink: NavigationRoute;
  @Input() hasLogin: Boolean = false;

  user: UserToken;
  guest: boolean;

  visibleLinks: NavigationRoute[] = []; // links that will be visible on the toolbar
  Subscriptions: Subscription[] = [];

  // TODO: optional Auth service?

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.Subscriptions.push(
      this.authService._user.subscribe((res) => {
        this.user = res;
        this.updateVisibleLinks();
      })
    ),
      this.authService._guest.subscribe((res) => {
        this.guest = res;
        this.updateVisibleLinks();
      });
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((sub) => sub.unsubscribe());
  }

  updateVisibleLinks(): void {
    if (!this.hasLogin) {
      this.visibleLinks = this.routerLinks;
      return;
    }

    this.visibleLinks = this.routerLinks.filter((link) =>
      this.checkAuthOnLink(link)
    );
  }

  checkAuthOnLink(link: NavigationRoute): boolean {
    if (link.requireAuth) {
      return this.guest || this.user != null;
    }
    return true;
  }
}
