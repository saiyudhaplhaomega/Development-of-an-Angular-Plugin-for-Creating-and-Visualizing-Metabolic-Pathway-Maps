import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from '../../input-form/input-form';

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
    console.log(this.showGuestLogin);
    this.showGuestLogin = !this.showGuestLogin;
  }
}
