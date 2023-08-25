import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { GuestInputComponent } from './login/guest-input/guest-input.component';
import { LoginButtonsComponent } from './login/login-buttons/login-buttons.component';
import { LoginButtonComponent } from './login/login-button/login-button.component';
import { PrivacyConsentBannerComponent } from './privacy-consent-banner/privacy-consent-banner.component';


@NgModule({
  declarations: [
    LoginButtonComponent,
    GuestInputComponent,
    LoginButtonsComponent,
    LoginPageComponent,
    NavToolbarComponent,
    PrivacyConsentBannerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
  ],
  exports: [
    LoginPageComponent,
    NavToolbarComponent,
    PrivacyConsentBannerComponent,
  ],
})
export class StandardPageLayoutModule { }
