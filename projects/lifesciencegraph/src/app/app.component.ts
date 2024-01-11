import { Component } from '@angular/core';
import {
  NestedNavigationRoute,
  AuthService,
  SimpleNavigationRoute,
  Logo,
} from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Life Science Graphs';
  routes: NestedNavigationRoute[] = [
    { route: '/proteins', label: 'Protein Mapping', requireAuth: false },
    { route: '/query', label: 'Query Graph', requireAuth: false },
  ];
  homelink: SimpleNavigationRoute = {
    route: '/home',
    label: 'Home',
    requireAuth: false,
  };

  footerContent: NestedNavigationRoute[] = [
    {
      label: 'About',
      children: [
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
