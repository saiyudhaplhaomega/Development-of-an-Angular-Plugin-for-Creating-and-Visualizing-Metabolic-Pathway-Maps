import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  AuthService,
  SimpleNavigationRoute,
  NestedNavigationRoute,
  Logo,
} from 'shared-lib';
import { RouteStateService } from './services/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omics Feature Finder';
  logo: Logo = {
    assetPath: '../assets/logo_08.svg',
    label: 'Omics Feature Finder',
  };

  homelink: SimpleNavigationRoute = {
    route: '/home',
    label: 'Home',
  };

  routes: NestedNavigationRoute[] = [
    { route: '/workflow', label: 'workflow', requireAuth: false },
    { route: '/about', label: 'about', requireAuth: false },
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

  footerLogos: Logo[] = [
    {
      label: 'leibniz',
      assetPath: 'assets/standard-logos/leibniz_white.png',
      href: 'https://www.leibniz-gemeinschaft.de',
    },
    {
      label: 'ISAS',
      assetPath: 'assets/standard-logos/isaslogooffizielleformrgbweiss.png',
      href: 'https://www.isas.de',
    },
    {
      label: 'nrw',
      assetPath: 'assets/standard-logos/nrw_black.svg',
      href: 'https://www.land.nrw',
      backgroundColor: 'white',
    },
    {
      label: 'bmbf',
      assetPath: 'assets/standard-logos/bmbf.svg',
      href: 'https://www.bmbf.de',
      backgroundColor: 'white',
    },
  ];

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
