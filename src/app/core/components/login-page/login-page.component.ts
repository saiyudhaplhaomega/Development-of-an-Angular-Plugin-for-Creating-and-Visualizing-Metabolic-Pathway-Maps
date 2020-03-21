import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthGuard } from '../../services/auth-guard.service';
import { authConfigGoogle } from '../../../authConfigGoogle';
import { authConfigElixir } from '../../../authConfigElixir';
import { UserToken } from '../../objects/user-token';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

  private user: UserToken;
  checked = false;
  guestlogin = false;
  showGuestLogin = false;
  private guestEmail = '';

  constructor(private oauthService: OAuthService,  private authGuard: AuthGuard) {
    this.authGuard.user.subscribe(usert => {
      console.log('auth user set')
      this.user = usert;
    });
    this.authGuard.guestemail.subscribe(guestEmail => {
      console.log('guest email set')
      this.guestEmail = guestEmail;
    });
  }

  showGuestInput(){
    this.showGuestLogin = true;
  }

  hideGuestInput(){
    this.showGuestLogin = false;
  }

  loginGuest() {
    const tempStr = this.guestEmail;
    this.authGuard.logout()
    this.guestlogin = true;
    this.guestEmail = tempStr;
    this.authGuard.guestemail.next(this.guestEmail);
    console.log(this.guestEmail);
  }

  async loginElixir() {
    this.authGuard.logout()
    this.oauthService.configure(authConfigElixir);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'elixir');
    this.oauthService.initLoginFlow();
  }

  async loginGoogle() {
    this.authGuard.logout()
    this.oauthService.configure(authConfigGoogle);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'google');
    this.oauthService.initLoginFlow();
  }
}
