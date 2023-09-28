import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  AuthService,
  SimpleNavigationRoute,
  NestedNavigationRoute,
} from 'shared-lib';
import { RouteStateService } from './services/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omics Feature Finder';
  homelink: SimpleNavigationRoute = {
    route: '/home',
    label: 'Home',
  };

  routes: NestedNavigationRoute[] = [
    { route: '/workflow', label: 'workflow', requireAuth: false },
    { route: '/about', label: 'about', requireAuth: false },
    {
      label: 'test',
      requireAuth: false,
      children: [
        { route: '/home', label: 'test1' },
        { route: '/home', label: 'test2' },
      ],
    },
    {
      label: 'test2',
      requireAuth: false,
      children: [
        { route: '/home', label: 'test1' },
        { route: '/home', label: 'test2' },
      ],
    },
  ];

  footerContent: NestedNavigationRoute[] = [
    {
      label: 'About',
      children: [
        { label: 'About Prophane', route: '/about' },
        { label: 'Terms of Service', route: '/termsofservice' },
        { label: 'Privacy Policy', route: '/privacypolicy' },
        { label: 'Impressum', route: '/impressum' },
      ],
    },
    {
      label: 'Funding & Support',
      children: [
        { label: 'DFG', href: 'http://www.dfg.de' },
        { label: 'de.NBI', href: 'http://www.denbi.de' },
        { label: 'de.NBI Cloud', href: 'https://www.denbi.de/cloud' },
      ],
    },
  ];

  footerLogoPath: string = 'assets/isaslogooffizielleformrgbweiss.png';

  constructor(
    private router: Router,
    private routeState: RouteStateService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routeState.setCurrentRoute(event.url);
      });
    this.authService.initializeOAuth();
  }
}
