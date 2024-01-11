import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  SimpleNavigationRoute,
  NestedNavigationRoute,
  Logo,
} from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'prophane';

  routes: SimpleNavigationRoute[] = [
    { route: '/jobsubmission', label: 'Job Submission', requireAuth: true },
    { route: '/jobcontrol', label: 'Job Control', requireAuth: true },
    { route: '/about', label: 'About Prophane', requireAuth: false },
    { route: '/tutorial', label: 'Prophane Tutorial', requireAuth: false },
  ];
  homelink: SimpleNavigationRoute = {
    route: '/jobsubmission',
    label: 'jobsubmission',
  };

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
    // {
    //   label: 'Related Projects & Services',
    //   children: [
    //     { label: 'Tax2Proteome', href: 'http://www.tax2proteome.de' },
    //    // { label: 'MPA', href: 'http://www.mpa.de' },
    //   ],
    // },
  ];

  footerLogos: Logo[] = [
    // {
    //   label: 'leibniz',
    //   assetPath: 'assets/standard-logos/leibniz_white.png',
    //   href: 'https://www.leibniz-gemeinschaft.de',
    // },
    // {
    //   label: 'ISAS',
    //   assetPath: 'assets/standard-logos/isaslogooffizielleformrgbweiss.png',
    //   href: 'https://www.isas.de',
    // },
    // {
    //   label: 'nrw',
    //   assetPath: 'assets/standard-logos/nrw_black.svg',
    //   href: 'https://www.land.nrw',
    //   backgroundColor: 'white',
    // },
    // {
    //   label: 'bmbf',
    //   assetPath: 'assets/standard-logos/bmbf.svg',
    //   href: 'https://www.bmbf.de',
    //   backgroundColor: 'white',
    // },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
