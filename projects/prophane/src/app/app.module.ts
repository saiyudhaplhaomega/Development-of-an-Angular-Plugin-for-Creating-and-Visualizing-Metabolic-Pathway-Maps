import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavToolbarModule, LoginModule } from 'shared-lib';
import { ProphaneModule } from './prophane/prophane.module';
import { NavigationBarComponent } from 'projects/mpa-website/src/app/core/components/navigation-bar/navigation-bar.component';
import { PrivacyConsentBannerComponent } from 'projects/mpa-website/src/app/core/components/privacy-consent-banner/privacy-consent-banner.component';
import { FooterComponent } from 'projects/mpa-website/src/app/core/components/footer/page-footer';
import { MaterialModule } from 'projects/mpa-website/src/app/material-module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    ProphaneModule,
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
