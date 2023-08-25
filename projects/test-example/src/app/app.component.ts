import { Component } from '@angular/core';
import { NavigationRoute } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testexample';
  routes: NavigationRoute[] = [
    { route: '/home', label: 'Home' },
    { route: '/content', label: 'Content' },
  ];
  homelink: NavigationRoute = { route: '/home', label: 'Home' }
}
