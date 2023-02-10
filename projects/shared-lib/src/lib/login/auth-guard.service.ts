import { Injectable } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfigGoogle } from './authConfigGoogle';
import { filter } from 'rxjs/operators';
import { authConfigElixir } from './authConfigElixir';
import { UserToken } from './user-token';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanLoad {
  public user: BehaviorSubject<UserToken> = new BehaviorSubject(undefined);
  public guestemail: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public guest: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _user: UserToken;
  private _guestemail: string;
  private _guest: boolean;
  private idProvider: string;

  constructor(private _router: Router, private oauthService: OAuthService) {

    this.user.subscribe((user) => {
      this._user = user;
    });
    this.guestemail.subscribe((guestemail) => {
      this._guestemail = guestemail;
    });
    this.guest.subscribe((guest) => {
      this._guest = guest;
    });
  }

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
    .pipe(filter(e => e.type === 'token_received'))
    .subscribe(_ => {
      this.oauthService.loadUserProfile().then(up => {
        this.user.next(up as UserToken);
        sessionStorage.setItem('user', JSON.stringify(up)); });
    });

    // TODO: does this do anything? (Manni)
    this.oauthService.events.subscribe(event => {
      console.log('login attempt');
    });

    // TODO: Timer for user expiration!!
    const savedItem = sessionStorage.getItem('user');
    if (savedItem !== null && savedItem !== '') {
      const savedToken = JSON.parse(savedItem) as UserToken;
      if (savedToken.exp * 1000 >= Date.now()) {
        this.user.next(savedToken);
      } else {
        console.log('token expired');
      }
    } else {
      console.log('oh nein: savedItem !== null && savedItem !== \'\'');
    }
  }

  loggedIn() {
    return !!(this._user || this._guest);
  }

  allowExpert() {
    return !!this._user;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this._user || this._guest) {
      return true;
    }
    // navigate to login page
    // TODO: ?? you can save redirect url so after authing we can move them back to the page they requested

    // TODO: pass the redirect adress??
    return this._router.parseUrl('/login');
  }

  // TODO: canLoad is deprecated, implement canMatch instead (https://github.com/angular/angular/pull/48180)
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this._user || this._guest) {
      return true;
    } else {
      // TODO: pass the redirect adress??
      return this._router.parseUrl('/login');
    }
  }

  getUser() {
    return this._user;
  }

  /**
   * This method returns the mpa-server-combatible authorization, either guestemail or idtoken
   *
   * @returns {string}
   */
  getUserAuthorization() {
    if (this._user) {
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
    this.user.next(undefined);
    this.guest.next(false);
    this.guestemail.next(undefined);
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('login_provider', '');
    this.oauthService.logOut();
    this._router.navigate(['/login']);
  }
}
