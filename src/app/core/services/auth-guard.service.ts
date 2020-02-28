import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserToken } from '../objects/user-token';

@Injectable()
export class AuthGuard implements CanActivate {

  public user: BehaviorSubject<UserToken> = new BehaviorSubject(undefined);
  private _user: UserToken;
  private idProvider: string;

  constructor(private _router: Router) {
    this.user.subscribe((user) => {
      this._user = user;
    });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._user) {
      console.log('auth true');
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);

    console.log('auth false');
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  getUser() {
    return this._user;
  }

  getUserId() {
    return this._user.sub;
  }

  setIdProvider(idP: string) {
    this.idProvider = idP;
  }

  getIdProvider() {
    return this.idProvider;
  }

}
