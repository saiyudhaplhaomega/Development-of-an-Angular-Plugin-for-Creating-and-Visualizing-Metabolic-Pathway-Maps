import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationRoute } from 'shared-lib';

@Component({
  selector: 'metadata-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
  ) {}

  title = 'metadatatool';

  routes: NavigationRoute[] = [
    { route: '/home', label: 'home' },
    { route: '/workflow', label: 'workflow' },
  ];



}
