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

  constructor(private oauthService: OAuthService,  private authGuard: AuthGuard) {
    this.authGuard.user.subscribe(usert => {
      this.user = usert;
    })
  }

  async loginElixir() {
    this.logout()
    this.oauthService.configure(authConfigElixir);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'elixir');
    this.oauthService.initLoginFlow();
  }

  async loginGoogle() {
    this.logout()
    this.oauthService.configure(authConfigGoogle);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'google');
    this.oauthService.initLoginFlow();
  }

  public logout() {
    // TODO: do we have to call endSession for Elixir?
    this.authGuard.user.next(undefined);
    this.oauthService.logOut();
  }

}
