import { Component } from '@angular/core';
import { NavigationRoute } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 

  
}) 
export class AppComponent {
  title = 'signaling-tool';  

  routes: NavigationRoute[] = [
    { route: '/home', label: 'home' }, // navigation toola ekleyebilirz de çıkarabiliriz de 
    { route: '/about', label: 'about' }, 
    { route: '/simulation', label: 'simulation'  }
  ];
}
