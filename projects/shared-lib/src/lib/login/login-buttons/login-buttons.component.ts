import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { InputFormComponent } from '../../input-form/input-form';

@Component({
  selector: 'shared-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.scss'],
})
export class LoginButtonsComponent {
  showGuestLogin = false;

  loginGoogle() {}

  toggleGuestInput() {
    console.log(this.showGuestLogin);
    this.showGuestLogin = !this.showGuestLogin;
  }
}
