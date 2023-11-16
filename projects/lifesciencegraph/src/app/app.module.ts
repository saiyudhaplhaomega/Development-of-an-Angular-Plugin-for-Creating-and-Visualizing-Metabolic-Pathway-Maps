import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StandardPageLayoutModule } from 'shared-lib';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';
import { LifeScienceQueryComponent } from './modules/life-science-query/life-science-query.component';
import { LifeScienceProteinsComponent } from './modules/life-science-proteins/life-science-proteins.component';

@NgModule({
  declarations: [
    AppComponent,
    TermsOfServicePageComponent,
    ImpressumPageComponent,
    PrivacyPolicyPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    StandardPageLayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
