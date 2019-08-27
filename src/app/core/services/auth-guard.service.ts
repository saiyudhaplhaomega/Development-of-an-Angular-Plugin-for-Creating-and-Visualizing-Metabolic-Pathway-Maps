import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { SocialUser } from 'angularx-social-login';
import { UserLogin } from '../classes/user-login';
import { SerializableObjectUploaderService } from 'src/app/shared/services/serializable-object-uploader.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private _user: SocialUser;
  private _serverUser: UserLogin;
  private _authState = false;

  constructor(private jsonUploader: SerializableObjectUploaderService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.getAuthState());
    if (this.getAuthState()) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

  setUser(user: SocialUser) {
    console.log('set user');
    this._user = user;

    this._serverUser = new UserLogin();
    this._serverUser.idToken = user.idToken;
    this._serverUser.provider = 'google';
    this._serverUser.sessionID = null;

    if (user != null) {
      this.setAuthState(true);
      //this.jsonUploader.postObj(this._serverUser, 'mpacloud/v1/login').subscribe(res => {
      //  this.setAuthState(res != null);
      //  this._serverUser = res;
      //});
    }
  }

  getUser(): SocialUser {
    return this._user;
  }

  private setAuthState(authState: boolean) {
    this._authState = authState;
  }

  getSessionID(): string {
    return this._serverUser.sessionID;
  }

  getAuthState(): boolean {
    return this._authState;
  }

}