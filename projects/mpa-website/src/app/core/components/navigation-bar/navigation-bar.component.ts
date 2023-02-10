import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard, AuthService } from 'dist/shared-lib';
import { UserToken } from 'dist/shared-lib';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  user: UserToken;
  guest: boolean;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService._user.subscribe((res) => {
      this.user = res;
    });
    this.authService._guest.subscribe((res) => {
      this.guest = res;
    });
  }

  isProphane() {
    // if (window.location.hostname == "prophane.de" || window.location.hostname == "www.prophane.de" || window.location.hostname == "localhost") {
    return (
      window.location.hostname === 'prophane.de' ||
      window.location.hostname === 'www.prophane.de'
    );
  }

  goto(route: string) {
    this.router.navigateByUrl(route);
  }
}
