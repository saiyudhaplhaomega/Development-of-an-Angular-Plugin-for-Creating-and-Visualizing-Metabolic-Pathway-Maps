import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebserveraddressService } from '../../shared/services/webserveraddress.service';
import { SocialUser } from 'angularx-social-login';
import { SerializableObjectUploaderService } from 'src/app/shared/services/serializable-object-uploader.service';


@Injectable({
  providedIn: 'root'
})

export class InternalAuthService {

  private _user: SocialUser;
  private _authState = false;

  constructor(private http: HttpClient, private webserver: WebserveraddressService, 
    private jsonUploader: SerializableObjectUploaderService) { }

  setUser(user: SocialUser) {
    this._user = user;
    if (user != null) {
      this.jsonUploader.postObj(user, 'mpacloud/v1/login').subscribe(res => {
        this.setAuthState(res != null);
      });
    }
  }

  getUser(): SocialUser {
    return this._user;
  }

  private setAuthState(authState: boolean) {
    this._authState = authState;
  }

  getAuthState(): boolean {
    return this._authState;
  }
}
