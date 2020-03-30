import {NgModule} from '@angular/core';

import {Routing} from './app.routing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import {AppComponent} from './app.component';

import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './core/components/login-page/login-page.component';
import {WebserveraddressService} from './core/services/webserveraddress.service';
import {FileUploaderService} from './core/services/file-uploader.service';
import {UploadProgressService} from './core/services/upload-progress.service';
import {NavigationBarComponent} from './core/components/navigation-bar/navigation-bar.component';
import {FooterComponent} from './core/components/footer/page-footer';
import {AuthGuard} from './core/services/auth-guard.service';
import {DbsearchcontentService} from './mpa/components/database-search-page/services/dbsearchcontent.service';

import {DataService} from './mpa/components/data-navigation-tree/services/data.service';
import {NavService} from './mpa/components/data-navigation-tree/services/nav.service';
import {ProphaneModule} from './prophane/prophane.module';
import {MpaModule} from './mpa/mpa.module';
import {HomeModule} from './home/home.module';
import {MaterialModule} from './material-module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TermsOfServicePageComponent } from './core/components/terms-of-service-page/terms-of-service-page.component';
import { PrivacyPolicyPageComponent } from './core/components/privacy-policy-page/privacy-policy-page.component';
import { ImpressumPageComponent } from './core/components/impressum-page/impressum-page.component';
import { PrivacyConsentBannerComponent } from './core/components/privacy-consent-banner/privacy-consent-banner.component';
import {ProphaneAboutComponent} from './prophane/components/prophane-policy-consent/prophane-policy-consent.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavigationBarComponent,
    FooterComponent,
    TermsOfServicePageComponent,
    PrivacyPolicyPageComponent,
    ImpressumPageComponent,
    PrivacyConsentBannerComponent,
    ProphaneAboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule,
    OAuthModule.forRoot(),
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    HomeModule,
    MpaModule,
    ProphaneModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    AuthGuard,
    WebserveraddressService,
    FileUploaderService,
    UploadProgressService,
    DbsearchcontentService,
    NavService,
    DataService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
