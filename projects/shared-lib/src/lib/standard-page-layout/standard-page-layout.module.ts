import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GuestInputComponent } from './login/guest-input/guest-input.component';
import { LoginButtonComponent } from './login/login-button/login-button.component';
import { LoginButtonsComponent } from './login/login-buttons/login-buttons.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { PrivacyConsentBannerComponent } from './privacy-consent-banner/privacy-consent-banner.component';

import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FileInputComponent } from './file-input/file-input.component';
import { UploadDialogComponent } from './dialog/upload-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/page-footer.component';
import { DeleteWarningDialogComponent } from './dialog/delete-warning-dialog.component';




@NgModule({
  declarations: [
    LoginButtonComponent,
    GuestInputComponent,
    LoginButtonsComponent,
    LoginPageComponent,
    NavToolbarComponent,
    PrivacyConsentBannerComponent,
    FileInputComponent,
    UploadDialogComponent,
    FooterComponent,
    DeleteWarningDialogComponent,
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    RouterModule,
    //BrowserAnimationsModule,
    FormsModule,


    OAuthModule.forRoot(),
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
  ],
  exports: [
    LoginPageComponent,
    NavToolbarComponent,
    PrivacyConsentBannerComponent,
    FileInputComponent,
    UploadDialogComponent,
    FooterComponent,
    DeleteWarningDialogComponent,
  ],
})
export class StandardPageLayoutModule { }
