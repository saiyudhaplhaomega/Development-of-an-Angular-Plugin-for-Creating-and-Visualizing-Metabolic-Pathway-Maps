import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  user: SocialUser;

  constructor(private router: Router, private authService: AuthService) { }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateTest() {
    this.router.navigateByUrl('/test');
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(res => {
      this.user = res;
    });
  }

}
