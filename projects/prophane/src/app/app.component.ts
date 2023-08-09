import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationRoute } from 'shared-lib';

@Component({
  selector: 'prophane-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
  ) {}

  title = 'prophane';

  routes: NavigationRoute[] = [
    { route: '/home', label: 'home' },
    { route: '/workflow', label: 'workflow' },
  ];



}
