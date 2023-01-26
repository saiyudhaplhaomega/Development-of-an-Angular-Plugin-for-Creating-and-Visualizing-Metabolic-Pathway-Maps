import { Injectable } from '@angular/core';
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
import { UserToken } from '../objects/user-token';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
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

  loggedIn() {
    return !!(this._user || this._guest);
  }

  allowExpert() {
    return !!this._user;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._user || this._guest) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
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
