import {NgModule} from '@angular/core';

import {Routing} from './app.routing';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';

import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';

import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './core/components/login-page/login-page.component';
import {WebserveraddressService} from './core/services/webserveraddress.service';
import {FileUploaderService} from './core/services/file-uploader.service';
import {UploadProgressService} from './core/services/upload-progress.service';
import {NavigationBarComponent} from './core/components/navigation-bar/navigation-bar.component';
import {AuthGuard} from './core/services/auth-guard.service';
import {DbsearchcontentService} from './mpa/components/database-search-page/services/dbsearchcontent.service';

import {DataService} from './mpa/components/data-navigation-tree/services/data.service';
import {NavService} from './mpa/components/data-navigation-tree/services/nav.service';
import {ProphaneModule} from './prophane/prophane.module';
import {MpaModule} from './mpa/mpa.module';
import {HomeModule} from './home/home.module';
import {MaterialModule} from './material-module';
import {FlexLayoutModule} from '@angular/flex-layout';


// Configs
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('533975881425-kerne9k4q8rhiqt6q0mn0gtcftohibcp.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavigationBarComponent,
  ],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    Routing,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    SocialLoginModule,
    HomeModule,
    MpaModule,
    ProphaneModule,
    MaterialModule,
  ],
  providers: [
    HttpClient,
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
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
