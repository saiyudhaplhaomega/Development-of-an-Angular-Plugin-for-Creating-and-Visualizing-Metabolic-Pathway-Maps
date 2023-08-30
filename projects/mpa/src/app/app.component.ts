import { Component, OnInit } from '@angular/core';
import { AuthService, NavigationRoute } from 'shared-lib';

//import { AuthGuard } from 'dist/shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'mpa';
  routes: NavigationRoute[] = [
    { route: '/mpa', label: 'MPA', requireAuth: true },
  ];
  homelink: NavigationRoute = { route: '/jobsubmission', label: 'jobsubmission' }

  constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.initializeOAuth();
    }

}
