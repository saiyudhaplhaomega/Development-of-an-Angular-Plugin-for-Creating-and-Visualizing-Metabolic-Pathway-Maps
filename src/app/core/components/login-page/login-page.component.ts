import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { OIDCUser } from '../../objects/user';
import { AuthGuard } from '../../services/auth-guard.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  currUser: OIDCUser;

  constructor(private router: Router, private oauthService: OAuthService, private authGuard: AuthGuard) {}

  ngOnInit() {

    this.oauthService.events.subscribe(event => {
      console.log('event: ' + event.type);
      console.log('event: ' + event);
      if (event.type === 'user_profile_loaded') {
        const claims = this.oauthService.getIdentityClaims();
        console.log(claims);
        const user = new OIDCUser();
        user.accessToken = this.oauthService.getAccessToken();
        user.firstName = claims['given_name'];
        user.lastName = claims['family_name'];
        user.name = user.firstName + ' ' + user.lastName;
        user.email = claims['email'];
        user.idToken = this.oauthService.getIdToken();
        user.photoUrl = claims['picture'];
        console.log(user);
        this.currUser = user;
        this.authGuard.user.next(user);
      }
    });

  }

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  // public get name() {
  //   let claims = this.oauthService.getIdentityClaims();
  //   if (!claims) return null;
  //   return claims.given_name;
  // }

}
