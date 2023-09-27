import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {OAuthService } from 'angular-oauth2-oidc';
// beginning with version 9 moved to own library, install via npm i angular-oauth2-oidc-jwks --save
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import { BehaviorSubject, filter } from 'rxjs';
import { authConfigElixir } from './authConfigElixir';
import { authConfigGoogle } from './authConfigGoogle';
import { UserToken } from './user-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _user: BehaviorSubject<UserToken> = new BehaviorSubject(undefined);
  public _guestemail: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public _guest: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public idProvider: string;

  constructor(private router: Router, private oauthService: OAuthService) {}

  initializeOAuth() {
    // Loads correct config for login provider
    if (sessionStorage.getItem('login_provider') === 'elixir') {
      this.setIdProvider('elixir');
      this.oauthService.configure(authConfigElixir);
    } else {
      this.setIdProvider('google');
      this.oauthService.configure(authConfigGoogle);
    }

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // Optional
    this.oauthService.setupAutomaticSilentRefresh();
    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile().then((up) => {
          // TODO: find a different way to retrieve UserToken
          this._user.next((up as any).info as UserToken);
          sessionStorage.setItem('user', JSON.stringify((up as any).info));
          console.log("user saved");
        });
      });

    // TODO: Timer for user expiration!!
    const savedItem = sessionStorage.getItem('user');
    if (savedItem !== null && savedItem !== '') {
      const savedToken = JSON.parse(savedItem) as UserToken;
      if (savedToken.exp * 1000 >= Date.now()) {
        this._user.next(savedToken);
      } else {
        console.log('token expired');
      }
    } else {
      console.log("oh nein: savuedItem !== null && savedItem !== ''");
    }
  }

  user() {
    return this._user.value;
  }

  getUserAuthorization() {
    if (this._user.value) {
      return sessionStorage.getItem('id_token');
    } else if (this._guestemail) {
      return 'ANONYMOUS:' + this._guestemail;
    } else {
      return 'ANONYMOUS:noEmail';
    }
  }

  setIdProvider(idP: string) {
    this.idProvider = idP;
  }

  getIdProvider() {
    return this.idProvider;
  }

  public logout() {
    // TODO: do we have to call endSession for Elixir?
    this._user.next(undefined);
    this._guest.next(false);
    this._guestemail.next(undefined);
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('login_provider', '');
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  allowExpert() {
    return !!this._user;
  }

  loggedIn() {
    return !!(this._user.getValue() || this._guest.getValue());
  }

  loginGuest(tempStr: string) {
    this.logout();
    this._guest.next(true);
    this._guestemail.next(tempStr);
  }

  async loginGoogle() {
    this.logout();
    this.oauthService.configure(authConfigGoogle);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('login_provider', 'google');
    this.oauthService.initLoginFlow();
    // this._router.navigate(['mpa']);
  }
}
