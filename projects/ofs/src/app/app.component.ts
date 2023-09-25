import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService, FooterContentMain, NavigationRoute } from 'shared-lib';
import { RouteStateService } from './services/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Omics Feature Finder';
  homelink: NavigationRoute = {
    route: '/home',
    label: 'Home',
  };

  routes: NavigationRoute[] = [
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
    {
      categoryName: 'Funding & Support',
      elements: [
        { name: 'DFG', href: 'http://www.dfg.de' },
        { name: 'de.NBI', href: 'http://www.denbi.de' },
        { name: 'de.NBI Cloud', href: 'https://www.denbi.de/cloud' },
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
    {
      categoryName: 'Funding & Support',
      elements: [
        { name: 'DFG', href: 'http://www.dfg.de' },
        { name: 'de.NBI', href: 'http://www.denbi.de' },
        { name: 'de.NBI Cloud', href: 'https://www.denbi.de/cloud' },
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
