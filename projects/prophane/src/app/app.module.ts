import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StandardPageLayoutModule } from 'shared-lib';

import { SideBarResultsComponent } from './components/side-bar-results/side-bar-results.component';
import { ProphaneResultViewComponent } from './modules/job-control/prophane-result-view/prophane-result-view.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';




@NgModule({
  declarations: [
    AppComponent,
    SafePipe, // where to put this? leave here?
    ProphaneResultViewComponent, // should be somwhere else
    SideBarResultsComponent, // should be somwhere else 
    TermsOfServicePageComponent, // should be somwhere else
    PrivacyPolicyPageComponent, // should be somwhere else
    ImpressumPageComponent, // should be somwhere else

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StandardPageLayoutModule,
    MatSidenavModule,
    MatExpansionModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}



