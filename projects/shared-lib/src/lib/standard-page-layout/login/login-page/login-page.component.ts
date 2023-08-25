import { Component, OnInit } from '@angular/core';
import { UserToken } from '../user-token';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'shared-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public user: UserToken;
  guestlogin: boolean = false;
  showGuestLogin = false;
  guestEmail = '';

  constructor(private _router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth._user.subscribe((u) => {
      this.user = u;
    });
    this.auth._guest.subscribe((g) => {
      this.guestlogin = !!g;
    });
  }

  loginGuest(email: string) {
    this.guestEmail = email;
    if (email.length > 0) {
      this.auth.loginGuest(this.guestEmail);
    } else {
      this.auth.loginGuest('ANONOYMOUS');
    }
  }

  async loginGoogle() {
    await this.auth.loginGoogle();
  }

}
