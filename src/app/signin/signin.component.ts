import {Component, OnInit} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import {WebserverloginService} from '../modules/mpa/services/webserverlogin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private loginservice: WebserverloginService) {}

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log('HALLIHALLO')
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
        // ...
        this.loginservice.login('Some String').subscribe( res => {
          console.log('Login Response: ' + res);
        });
      }
    );
  }

  ngOnInit(): void {
    console.log('hallo w****');

  }

}
