import { Component, OnInit } from '@angular/core';
import { AuthService, NavigationRoute } from 'dist/shared-lib';
import {
  FooterContentMain,
  FooterContentSubElement,
} from 'projects/shared-lib/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'prophane';
  routes: NavigationRoute[] = [
    { route: '/jobsubmission', label: 'Job Submission', requireAuth: true },
    { route: '/jobcontrol', label: 'Job Control', requireAuth: true },
    { route: '/about', label: 'About Prophane', requireAuth: false },
  ];
  homelink: NavigationRoute = {
    route: '/jobsubmission',
    label: 'jobsubmission',
  };

  footerContent: FooterContentMain[] = [
    {
      categoryName: 'About',
      elements: [
        { name: 'About Prophane', routerLink: '/about' },
        { name: 'Terms of Service', routerLink: '/termsofservice' },
        { name: 'Privacy Policy', routerLink: '/privacypolicy' },
        { name: 'Impressum', routerLink: '/impressum' },
      ],
    },
    {
      categoryName: 'Funding & Support',
      elements: [
        { name: 'DFG', href: 'http://www.dfg.de' },
        { name: 'de.NBI', href: 'http://www.denbi.de' },
        { name: 'de.NBI Cloud', href: 'https://www.denbi.de/cloud' },
      ],
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
