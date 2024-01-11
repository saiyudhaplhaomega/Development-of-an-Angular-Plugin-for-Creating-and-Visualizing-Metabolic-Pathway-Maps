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
  title = 'MetaForge';
  routes: NestedNavigationRoute[] = [
    // { route: "/upload", label: "Upload", requireAuth: false },
    // { route: "/sdrf", label: "sdrf", requireAuth: false },
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
        { label: 'About Metadata-Tool', route: '/about' },
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

  toolLogo: Logo = {
    label: 'MetaForge',
    assetPath: 'assets/img/IconLogo.png',
  };

  footerLogos: Logo[] = [
    {
      label: 'leibniz',
      assetPath: 'assets/leibniz_white.png',
      href: 'https://www.leibniz-gemeinschaft.de',
    },
    {
      label: 'ISAS',
      assetPath: 'assets/isaslogooffizielleformrgbweiss.png',
      href: 'https://www.isas.de',
    },
    {
      label: 'nrw',
      assetPath: 'assets/nrw_black.svg',
      href: 'https://www.land.nrw',
    },
    {
      label: 'bmbf',
      assetPath: 'assets/bmbf.svg',
      href: 'https://www.bmbf.de',
    },
  ];

  footerLogoPath = 'assets/isaslogooffizielleformrgbweiss.png';

  showLogo: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
