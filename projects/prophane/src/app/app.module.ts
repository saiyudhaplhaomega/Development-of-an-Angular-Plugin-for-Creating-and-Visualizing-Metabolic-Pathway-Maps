import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StandardPageLayoutModule } from 'shared-lib';

// TODO: remove this
import { MaterialModule } from 'projects/mpa/src/app/material-module';
// TODO: move to shared-lib
import { FooterComponent } from 'projects/mpa/src/app/core/components/footer/page-footer';

import { SideBarResultsComponent } from './components/side-bar-results/side-bar-results.component';
import { ProphaneResultViewComponent } from './modules/job-control/prophane-result-view/prophane-result-view.component';


import { SafePipe } from './safe.pipe';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';

@NgModule({
  declarations: [
    AppComponent,

    FooterComponent, // move to shared-lib

    SideBarResultsComponent, // should be somwhere else -> shared-ib

    ProphaneResultViewComponent, // should be somwhere else

    TermsOfServicePageComponent,
    PrivacyPolicyPageComponent,
    ImpressumPageComponent,

    SafePipe, // where to put this?
  ],
  providers: [
    HttpClient,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, //--> needed?
    //FormsModule, --> needed?
    //ReactiveFormsModule, --> needed?

    HttpClientModule,

    AppRoutingModule,

    StandardPageLayoutModule,

    MaterialModule, // remove, replace with individual imports
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
