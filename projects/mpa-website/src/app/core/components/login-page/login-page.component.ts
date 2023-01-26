import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGuard } from '../../services/auth-guard.service';
import { authConfigGoogle } from '../../../authConfigGoogle';
import { authConfigElixir } from '../../../authConfigElixir';
import { UserToken } from '../../objects/user-token';
import { Router } from '@angular/router';

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
    private oauthService: OAuthService,
    public authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.authGuard.user.subscribe((usert) => {
      this.user = usert;
    });
    this.authGuard.guestemail.subscribe((guestEmail) => {
      this.guestEmail = guestEmail;
    });
    this.authGuard.guest.subscribe((guest) => {
      this.guestlogin = guest;
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
    this._router.navigateByUrl('mpa');
  }

  loginGuest() {
    const tempStr = this.guestEmail;
    this.authGuard.logout();
    this.guestlogin = true;
    this.guestEmail = tempStr;
    this.authGuard.guestemail.next(this.guestEmail);
    this.authGuard.guest.next(this.guestlogin);
    this.hideGuestInput();
  }

  async loginElixir() {
    this.authGuard.logout();
    this.oauthService.configure(authConfigElixir);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'elixir');
    this.oauthService.initLoginFlow();
  }

  async loginGoogle() {
    this.authGuard.logout();
    this.oauthService.configure(authConfigGoogle);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'google');
    this.oauthService.initLoginFlow();
  }

  isEmail(value) {
    if (!String(value).match('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')) {
      return false;
    } else {
      return true;
    }
  }
}
