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
      this.oauthService.configure(authConfigElixir);
    } else {
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
      this.oauthService.loadUserProfile().then(up => {console.log(up); authGuard.user.next(up as UserToken)})
    });
    this.oauthService.events.subscribe(event => {
      console.log(event.type);
    });
  }

}
