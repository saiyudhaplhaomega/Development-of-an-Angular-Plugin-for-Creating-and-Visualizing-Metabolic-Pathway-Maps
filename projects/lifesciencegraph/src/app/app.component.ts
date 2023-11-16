import { Component } from '@angular/core';
import { NestedNavigationRoute, AuthService, SimpleNavigationRoute } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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

  footerLogoPath: string = 'assets/isaslogooffizielleformrgbweiss.png';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initializeOAuth();
  }
}
