import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  SimpleNavigationRoute,
  NestedNavigationRoute,
} from './navigation-route.model';
import { AuthService } from '../login/auth.service';
import { UserToken } from '../login/user-token';
import { Subscription } from 'rxjs';
import { Logo } from '../footer/footer-logo.model';

@Component({
  selector: 'shared-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit, OnDestroy {
  @Input() applicationName: string = '';
  @Input() routerLinks: NestedNavigationRoute[] = [];
  @Input() homeLink: SimpleNavigationRoute;
  @Input() hasLogin: Boolean = false;
  @Input() toolLogo: Logo;
  @Input() showLogo: boolean = false;

  user: UserToken;
  guest: boolean;

  visibleLinks: NestedNavigationRoute[] = []; // links that will be visible on the toolbar
  Subscriptions: Subscription[] = [];

  // TODO: optional Auth service?

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // subscribes to authservice and changes visible link buttons as soon as the visitor role changes
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

  // changes visible buttons
  updateVisibleLinks(): void {
    // if login is not required, all links are visible
    if (!this.hasLogin) {
      this.visibleLinks = this.routerLinks;
      return;
    }

    // filter for links that should be only visible upon login
    this.visibleLinks = this.routerLinks.filter((link) =>
      this.checkAuthOnLink(link)
    );
  }

  checkAuthOnLink(link: NestedNavigationRoute): boolean {
    if (link.requireAuth) {
      return this.guest || this.user != null;
    }
    return true;
  }

  navigateLogin() {}
}
