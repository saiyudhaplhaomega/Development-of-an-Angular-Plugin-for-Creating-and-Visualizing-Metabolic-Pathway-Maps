import { Component } from '@angular/core';
import {
  AuthService,
  NestedNavigationRoute,
  SimpleNavigationRoute,
  Logo,
} from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Multi-Dimensional-Omics Toolbox';
  homelink: SimpleNavigationRoute = {
    route: '/home',
    label: 'Home',
  };

  routes: NestedNavigationRoute[] = [
    {
      label: 'Tools',
      requireAuth: false,
      children: [
        { route: '/template', label: 'Template 1' },
        { route: '/mpa-page', label: 'MPA' },
        { route: '/prophane-page', label: 'Prophane' },
        { route: '/metaforge-page', label: 'MetaForge' },
        { route: '/app-tools', label: 'Test' },
      ],
    },
    {
      label: 'Scripts',
      requireAuth: false,
      route: '/template-script-page',
    },
    {
      label: 'Knowledge Graphs',
      requireAuth: false,
      children: [
        { route: '/PharMeBINet', label: 'PharMeBINet' },
        { route: '/Biodwh2_dwh', label: 'Biodwh2_dwh' },
      ],
    },
    {
      label: 'Training',
      requireAuth: false,
      children: [
        { route: '/workshops', label: 'Workshops' },
        { route: '/tutorials', label: 'Tutorial' },
        { route: '/lectures', label: 'Study Material' },
      ],
    },
    {
      label: 'About',
      requireAuth: false,
      children: [
        { route: '/mdoa-team', label: 'MdOA Group' },
        { route: '/other', label: 'Other Team' },
      ],
    },
  ];

  footerContent: NestedNavigationRoute[] = [
    {
      label: 'About',
      children: [
        { label: 'About MdOA Toolbox', route: '/about' },
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
        { label: 'NFDI4Microbiota', href: 'http://nfdi4microbiota.de' },
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
