import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { StandardPageLayoutModule } from 'shared-lib';
import { MatCardModule } from "@angular/material/card";
import { NgParticlesModule } from "ng-particles";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { LandingPageModule } from './modules/landing-page-module/landing-page.module';
import { BackgroundModule } from './modules/landing-page-module/submodules/background-module/background.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    StandardPageLayoutModule,
    NgParticlesModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    LandingPageModule,
    BackgroundModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
