import { Component, Input, OnInit } from '@angular/core';
import { NavigationRoute } from './navigation-route.model';

@Component({
  selector: 'ui-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit {
  @Input() applicationName: string = '';
  @Input() routerLinks: NavigationRoute[] = [];
  @Input() home: Boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
