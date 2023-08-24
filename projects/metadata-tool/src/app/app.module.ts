import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';
import { NavToolbarModule } from 'shared-lib';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from 'shared-lib';
import { WorkflowModule } from './metadata-workflow/metadate-workflow.module';
import { MetaDataCheckboxSelectionModule } from './metadata-checkboxselection/metadata-checkboxselection.module';

@NgModule({
  declarations: [
    AppComponent,
    MetadataLandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavToolbarModule,
    MatButtonModule,
    LoginModule,
    BrowserAnimationsModule,
    WorkflowModule,
    MetaDataCheckboxSelectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
