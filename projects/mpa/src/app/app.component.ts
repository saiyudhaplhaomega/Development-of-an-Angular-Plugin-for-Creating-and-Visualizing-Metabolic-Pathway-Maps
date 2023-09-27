import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  NestedNavigationRoute,
  SimpleNavigationRoute,
} from 'shared-lib';

//import { AuthGuard } from 'dist/shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MPA';

  routes: NestedNavigationRoute[] = [
    { route: '/mpa', label: 'MPA', requireAuth: true },
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
  ];

  footerLogoPath: string = 'assets/isaslogooffizielleformrgbweiss.png';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
