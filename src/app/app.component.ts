import {Component} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private oauthService: OAuthService) {
    this.configure();
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.oauthService.loadUserProfile();
      });
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.strictDiscoveryDocumentValidation = false;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    // Display all events
    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });
  }

}
