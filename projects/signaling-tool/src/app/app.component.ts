import { Component } from '@angular/core';

import {
  AuthService,
  SimpleNavigationRoute,
  NestedNavigationRoute,
} from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 

  
}) 
export class AppComponent {
  title = 'signaling-tool';  
  homeLink: SimpleNavigationRoute=  
    { route: '/landing', label: 'landing' } 
  ;

  routes:  SimpleNavigationRoute[] = [
    { route: '/landing', label: 'landing' }, // navigation toola ekleyebilirz de çıkarabiliriz de 
    { route: '/workflow', label: 'workflow' }, 
    
  ];
}
