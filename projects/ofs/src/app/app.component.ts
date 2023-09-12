import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService, FooterContentMain, HttpClientService, NavigationRoute } from 'shared-lib';
import { RouteStateService } from './services/route-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClientService,
    private router: Router,
    private routeState: RouteStateService,
    private authService: AuthService
  ) {}

  title = 'Omics Feature Finder';
  routes: NavigationRoute[] = [
    { route: '/workflow', label: 'workflow', requireAuth: false },
  ];
  homelink: NavigationRoute = {
    route: '/home',
    label: 'Home',
    requireAuth: false,
  };
  footercontent: FooterContentMain[] = [
    {
      categoryname: 'About',
      elements: [
        {name: 'About Prophane', routerlink: '/about'},
        {name: 'Terms of Service', routerlink: '/termsofservice'},
        {name: 'Privacy Policy', routerlink: '/privacypolicy'},
        {name: 'Impressum', routerlink: '/impressum'},
      ]
    },
    {
      categoryname: 'Funding & Support',
      elements: [
        {name: 'DFG', href: 'http://www.dfg.de'},
        {name: 'de.NBI', href: 'http://www.denbi.de'},
        {name: 'de.NBI Cloud', href: 'https://www.denbi.de/cloud'},
      ]
    },
  ];

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routeState.setCurrentRoute(event.url);
      });
    this.authService.initializeOAuth();
  }
}
