import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MpaModule } from './modules/mpa/mpa.module';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';

import {WebserveraddressService} from './shared/services/webserveraddress.service';
import {Neo4jhttprequestsService} from './modules/mpa/services/neo4jhttprequests.service';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider} from 'angular-6-social-login';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('533975881425-kerne9k4q8rhiqt6q0mn0gtcftohibcp.apps.googleusercontent.com')
      }
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    MpaModule,

    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    Neo4jhttprequestsService,
    HttpClient,
    WebserveraddressService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
