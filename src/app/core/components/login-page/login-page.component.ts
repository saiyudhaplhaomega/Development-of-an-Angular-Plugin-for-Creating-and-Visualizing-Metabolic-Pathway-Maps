import { Component, OnInit } from '@angular/core';
//import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {SocialUser} from 'angularx-social-login';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  user: SocialUser;

  //constructor(private authService: AuthService, private router: Router, private oauthService: OAuthService) {}
  constructor(private router: Router, private oauthService: OAuthService) {}

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(_ => {
  //       //this.router.navigateByUrl('/login');
  //     }
  //   );
  // }

  // signOut(): void {
  //   this.authService.signOut();
  //   console.log('Signing out?');
  // }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    // });
    this.oauthService.events.subscribe(event => {
      console.log('event: ' + event.type);
      console.log('event: ' + event);
      if (event.type === 'user_profile_loaded') {
        const accessToken: string = this.oauthService.getAccessToken();
        const claims = this.oauthService.getIdentityClaims();
        const idToken = this.oauthService.getIdToken();
        console.log('idtoken ' + idToken);
        console.log('claim name ' + claims['given_name']);
        console.log('atoken: ' + accessToken);
        this.user = new SocialUser();
        this.user.idToken = idToken;
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
