import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialUser, AuthService } from 'angularx-social-login';

@Injectable()
export class AuthGuard implements CanActivate {

  private _user: SocialUser;

  constructor(private authService: AuthService, private _router: Router) {
    this.authService.authState.subscribe((user) => {
      this._user = user;
    });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._user) {
        return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);
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
