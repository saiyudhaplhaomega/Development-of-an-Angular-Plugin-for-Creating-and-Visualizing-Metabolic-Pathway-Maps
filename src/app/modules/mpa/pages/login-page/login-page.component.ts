import {Component, OnInit} from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AuthGuard } from '../../../../core/services/auth-guard.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  private user: SocialUser;

  constructor( private authService: AuthService, private AuthGuardService: AuthGuard) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log('Signing in?');
  }

  signOut(): void {
    this.authService.signOut();
    console.log('Signing out?');
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user && this.AuthGuardService.getUser() !== user) {
        this.AuthGuardService.setUser(user);
      }
    });
  }

}
