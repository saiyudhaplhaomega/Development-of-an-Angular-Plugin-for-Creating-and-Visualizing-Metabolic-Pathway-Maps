import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { UserToken } from './user-token';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OAuthModule.forRoot(),
  ],
  exports: [LoginPageComponent],
})
export class LoginModule {}
