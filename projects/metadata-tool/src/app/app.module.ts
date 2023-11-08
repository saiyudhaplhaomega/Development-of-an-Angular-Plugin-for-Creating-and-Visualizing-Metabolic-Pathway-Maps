import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WorkflowModule } from './metadata-workflow/metadata-workflow.module';
import { MetaDataCheckboxSelectionModule } from './metadata-checkboxselection/metadata-checkboxselection.module';
import { MetadataUploadpageModule } from './metadata-uploadpage/metadata-uploadpage.module';
import { HttpClientModule } from '@angular/common/http';
import { MetadataDownloadpageModule } from './metadata-downloadpage/metadata-downloadpage.module';
import { StandardPageLayoutModule } from 'dist/shared-lib';

@NgModule({
  declarations: [
    AppComponent,
    MetadataLandingPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    StandardPageLayoutModule,
    BrowserAnimationsModule,
    WorkflowModule,
    MetaDataCheckboxSelectionModule,
    MetadataUploadpageModule,
    HttpClientModule,
    MetadataDownloadpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
