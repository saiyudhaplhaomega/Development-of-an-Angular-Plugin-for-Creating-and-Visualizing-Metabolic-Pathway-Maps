import { Component, OnInit } from '@angular/core';
import { AuthService, NavigationRoute } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'prophane';
  routes: NavigationRoute[] = [
    { route: '/jobsubmission', label: 'Job Submission' },
    { route: '/jobcontrol', label: 'Job Control' },
    { route: '/about', label: 'About Prophane' },
  ];
  homelink: NavigationRoute = { route: '/jobsubmission', label: 'jobsubmission' }

  constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.initializeOAuth();
    }


}
