import { Component } from '@angular/core';
import { NavigationRoute } from 'shared-ui-lib';
import { OfsHttpClientService } from './services/ofs-http-client.service';

@Component({
  selector: 'ofs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: OfsHttpClientService) {}

  routes: NavigationRoute[] = [
    { route: '/home', label: 'home' },
    { route: '/workflow', label: 'workflow' },
  ];
}
