import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import { OIDCUser } from '../../objects/user';
import { AuthGuard } from '../../services/auth-guard.service';
import {authConfigGoogle} from '../../../authConfigGoogle';
import {filter} from 'rxjs/operators';
import {authConfigElixir} from '../../../authConfigElixir';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  currUser: OIDCUser;

  constructor(private router: Router, private oauthService: OAuthService,  private authGuard: AuthGuard) {}

  ngOnInit() {
    this.oauthService.events.subscribe(event => {
      console.log('event: ' + event.type);
      console.log('event: ' + event);
      if (event.type === 'user_profile_loaded') {
        const claims = this.oauthService.getIdentityClaims();
        console.log(claims);
        const user = new OIDCUser();
        user.accessToken = this.oauthService.getAccessToken();
        user.firstName = claims['given_name'];
        user.lastName = claims['family_name'];
        user.name = user.firstName + ' ' + user.lastName;
        user.email = claims['email'];
        user.idToken = this.oauthService.getIdToken();
        user.photoUrl = claims['picture'];
        console.log(user);
        this.currUser = user;
        this.authGuard.user.next(user);
      }
    });

  }

  public loginElixir() {
    this.configure(authConfigElixir);
    this.oauthService.initLoginFlow();
  }

  public loginGoogle() {
    this.configure(authConfigGoogle);
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    // TODO: do we have to call endSession for Elixir?
    this.oauthService.logOut();
  }

  private configure(authConfig) {
    this.oauthService.configure(authConfig);
    this.oauthService.strictDiscoveryDocumentValidation = false;
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    // Optional
    //this.oauthService.setupAutomaticSilentRefresh();

    // Display all events
    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        this.oauthService.loadUserProfile();
      });
  }


}
