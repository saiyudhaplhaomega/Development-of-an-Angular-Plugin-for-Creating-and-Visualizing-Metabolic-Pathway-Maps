import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NavToolbarModule, LoginModule } from 'shared-lib';
import { ProphaneModule } from './prophane/prophane.module';
import { NavigationBarComponent } from 'projects/mpa/src/app/core/components/navigation-bar/navigation-bar.component';
import { PrivacyConsentBannerComponent } from 'projects/mpa/src/app/core/components/privacy-consent-banner/privacy-consent-banner.component';
import { FooterComponent } from 'projects/mpa/src/app/core/components/footer/page-footer';
import { MaterialModule } from 'projects/mpa/src/app/material-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UploadProgressService } from 'projects/mpa/src/app/core/services/upload-progress.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginModule } from 'shared-lib';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PrivacyConsentBannerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LoginModule,
    //NavToolbarModule,
  ],
  providers: [
    ProphaneModule,
    HttpClient,
    UploadProgressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


