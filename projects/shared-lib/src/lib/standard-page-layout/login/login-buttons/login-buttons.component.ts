import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shared-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.scss'],
})
export class LoginButtonsComponent {
  @Output() loginGoogleEvent = new EventEmitter<any>();
  @Output() loginGuestEvent = new EventEmitter<string>();

  showGuestLogin = false;

  loginGoogle() {
    this.loginGoogleEvent.emit();
  }

  loginGuest(guestMail: string) {
    this.loginGuestEvent.emit(guestMail);
  }

  toggleGuestInput() {
    this.showGuestLogin = !this.showGuestLogin;
  }
}
