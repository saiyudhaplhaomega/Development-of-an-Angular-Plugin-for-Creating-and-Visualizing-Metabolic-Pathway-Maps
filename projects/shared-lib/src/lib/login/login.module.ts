import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { LoginButtonsComponent } from './login-buttons/login-buttons.component';

@NgModule({
  declarations: [LoginPageComponent, LoginButtonsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OAuthModule.forRoot(),
    MatCardModule,
  ],
  exports: [LoginPageComponent, LoginButtonsComponent],
})
export class LoginModule {}
