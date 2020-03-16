import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfigGoogle } from './authConfigGoogle';
import { filter } from 'rxjs/operators';
import { authConfigElixir } from './authConfigElixir';
import { AuthGuard } from './core/services/auth-guard.service';
import { UserToken } from './core/objects/user-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private oauthService: OAuthService, private authGuard: AuthGuard) {

    // Loads correct config for login provider
    if (sessionStorage.getItem('login_provider') === 'elixir') {
      this.authGuard.setIdProvider('elixir');
      this.oauthService.configure(authConfigElixir);
    } else {
      this.authGuard.setIdProvider('google');
      this.oauthService.configure(authConfigGoogle);
    }

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    // Automatically load user profile
    this.oauthService.events
    .pipe(filter(e => e.type === 'token_received'))
    .subscribe(_ => {
      this.oauthService.loadUserProfile().then(up => {
        console.log(up); 
        authGuard.user.next(up as UserToken);
        sessionStorage.setItem('user', JSON.stringify(up));})
    });
    this.oauthService.events.subscribe(event => {
      console.log(event.type);
    });

    // TODO: Timer for user expiration!!
    let savedItem = sessionStorage.getItem('user')
    if (savedItem != '') {
      let savedToken = JSON.parse(savedItem) as UserToken;
      if (savedToken.exp * 1000 >= Date.now()){
        this.authGuard.user.next(savedToken)
        console.log(new Date(savedToken.exp * 1000))
      } else {
        console.log("token expired")
      }
    } else {
      console.log('oh neim')
    }
  }

}
