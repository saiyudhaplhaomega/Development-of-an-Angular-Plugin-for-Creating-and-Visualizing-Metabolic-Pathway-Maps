import { Component } from '@angular/core';
import { AuthService, NavigationRoute } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'metadatatool';
  routes: NavigationRoute[] = [
    { route: '/upload', label: 'Upload', requireAuth: false },
    { route: '/workflow', label: 'Workflow', requireAuth: false },
    { route: '/download', label: 'Donwload', requireAuth: false },

  ];
  homelink: NavigationRoute =  { route: '/home', label: 'Home', requireAuth: false };

  constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.initializeOAuth();
    }



}
