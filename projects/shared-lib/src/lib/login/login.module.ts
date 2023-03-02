import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { GuestInputComponent } from './guest-input/guest-input.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginButtonComponent,
    LoginButtonsComponent,
    GuestInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OAuthModule.forRoot(),
    MatCardModule,
    MatRippleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [LoginPageComponent],
})
export class LoginModule {}
