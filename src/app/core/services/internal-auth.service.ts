import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebserveraddressService } from '../../shared/services/webserveraddress.service';
import { SocialUser } from 'angularx-social-login';
import { SerializableObjectUploaderService } from 'src/app/shared/services/serializable-object-uploader.service';
import { UserLogin } from '../classes/user-login';


@Injectable({
  providedIn: 'root'
})

export class InternalAuthService {

  private _user: SocialUser;
  private _serverUser: UserLogin;
  private _authState = false;

  constructor(private http: HttpClient, private webserver: WebserveraddressService,
    private jsonUploader: SerializableObjectUploaderService) { }

  setUser(user: SocialUser) {
    console.log('set user');
    this._user = user;

    this._serverUser = new UserLogin();
    this._serverUser.idToken = user.idToken;
    this._serverUser.provider = 'google';
    this._serverUser.sessionID = null;

    if (user != null) {
      this.jsonUploader.postObj(this._serverUser, 'mpacloud/v1/login').subscribe(res => {
        this.setAuthState(res != null);
        this._serverUser = res;
      });
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
