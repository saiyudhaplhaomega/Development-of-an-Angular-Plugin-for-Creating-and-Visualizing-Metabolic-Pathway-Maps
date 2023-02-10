import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGuard } from './auth-guard.service';
import { UserToken } from './user-token';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  public user: UserToken;
  guestlogin = false;
  showGuestLogin = false;
  guestEmail = '';

  constructor(
    private _router: Router,
    //public authGuard: AuthGuard,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      console.log(event);
    });
    this.auth._user.subscribe((u) => {
      this.user = u;
    });
    this.auth._guest.subscribe((g) => {
      this.guestlogin = !!g;
    });
  }

  showGuestInput() {
    this.showGuestLogin = true;
  }

  hideGuestInput() {
    this.showGuestLogin = false;
  }

  navigateProphane() {
    this._router.navigateByUrl('prophane');
  }

  navigateMpa() {
    this._router.navigateByUrl('/mpa');
  }

  loginGuest() {
    this.hideGuestInput();
    if (this.isEmail(this.guestEmail)) {
      this.auth.loginGuest(this.guestEmail);
    } else {
      this.auth.loginGuest('ANONOYMOUS');
    }
  }

  async loginGoogle() {
    await this.auth.loginGoogle();
  }

  isEmail(value: string) {
    if (!String(value).match('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')) {
      return false;
    } else {
      return true;
    }
  }
}
