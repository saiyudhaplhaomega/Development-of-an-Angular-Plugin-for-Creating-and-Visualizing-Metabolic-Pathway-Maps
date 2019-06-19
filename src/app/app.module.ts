import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MpaModule } from './modules/mpa/mpa.module';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

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
    HttpClient,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
