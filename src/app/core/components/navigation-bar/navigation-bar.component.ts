import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router) { }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateTest() {
    this.router.navigateByUrl('/test');
  }

}
