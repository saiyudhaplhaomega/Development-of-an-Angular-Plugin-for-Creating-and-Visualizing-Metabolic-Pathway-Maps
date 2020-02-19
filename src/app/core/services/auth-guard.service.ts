import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { OIDCUser } from '../objects/user';

@Injectable()
export class AuthGuard implements CanActivate {

  public user: BehaviorSubject<OIDCUser> = new BehaviorSubject(undefined);
  private _user: OIDCUser;

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
    //this._router.navigate(['/login']);
    console.log('auth false');
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  getIDToken() {
    return this._user.idToken;
  }

  getUser() {
    return this._user;
  }

}
