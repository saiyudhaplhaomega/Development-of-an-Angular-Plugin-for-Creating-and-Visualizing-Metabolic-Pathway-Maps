import { Component, OnInit } from '@angular/core';
import { AuthService, NavigationRoute } from 'dist/shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'prophane';
  routes: NavigationRoute[] = [
    { route: '/jobsubmission', label: 'Job Submission', requireAuth: true },
    { route: '/jobcontrol', label: 'Job Control', requireAuth: true },
    { route: '/about', label: 'About Prophane', requireAuth: false },
  ];
  homelink: NavigationRoute = { route: '/jobsubmission', label: 'jobsubmission' }

  constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.initializeOAuth();
    }


}
