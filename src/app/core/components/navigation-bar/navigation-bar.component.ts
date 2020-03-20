import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';
import { UserToken } from '../../objects/user-token';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  user: UserToken;

  constructor(private router: Router, private authGuard: AuthGuard) { }

  navigateLogin() {
    this.router.navigateByUrl('/login');
  }

  isProphane() {
    if (window.location.hostname == "www.prophane.de" || window.location.hostname == "localhost") {
      return true;
    }
    return false;
  }

  toggleHomepage() {
      this.router.navigateByUrl('/home');
    }

  toggleMPA() {
    this.router.navigateByUrl('/mpa');
  }

  toggleProphane() {
    this.router.navigateByUrl('/prophane');
  }

  toggleTOS() {
    this.router.navigateByUrl('/termsofservice');
  }

  togglePP() {
    this.router.navigateByUrl('/privacypolicy');
  }

  toggleImpressum() {
    this.router.navigateByUrl('/impressum');
  }

  ngOnInit(): void {
    this.authGuard.user.subscribe(res => {
      this.user = res;
    });
  }

}
