import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService, HttpClientService, NavigationRoute } from 'shared-lib';
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

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routeState.setCurrentRoute(event.url);
      });
    this.authService.initializeOAuth();
  }
}
