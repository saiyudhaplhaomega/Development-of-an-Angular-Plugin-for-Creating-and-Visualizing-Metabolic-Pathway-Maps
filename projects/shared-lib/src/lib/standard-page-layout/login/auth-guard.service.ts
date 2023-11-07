import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(private _router: Router, private auth: AuthService) {
    // this.user.subscribe((user) => {
    //   this._user = user;
    // });
    // this.guestemail.subscribe((guestemail) => {
    //   this._guestemail = guestemail;
    // });
    // this.guest.subscribe((guest) => {
    //   this._guest = guest;
    // });
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
    //if (this.auth._user || this.auth._guest) {
    return this.auth.loggedIn();
    //} else {
    // TODO: pass the redirect adress??
    //  return this._router.parseUrl('/login');
    //}
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.auth.loggedIn();
    // navigate to login page
    // TODO: ?? you can save redirect url so after authing we can move them back to the page they requested

    // TODO: pass the redirect adress??
    //return this._router.parseUrl('/login');
  }
}
