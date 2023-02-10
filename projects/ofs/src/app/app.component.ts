import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationRoute } from 'shared-lib';
import { RouteStateService } from './services/route-state.service';
import { OfsHttpClientService } from './services/ofs-http-client.service';

@Component({
  selector: 'ofs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private http: OfsHttpClientService,
    private router: Router,
    private routeState: RouteStateService
  ) {}

  routes: NavigationRoute[] = [
    { route: '/home', label: 'home' },
    { route: '/workflow', label: 'workflow' },
  ];

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.routeState.setCurrentRoute(event.url);
      });
  }
}
