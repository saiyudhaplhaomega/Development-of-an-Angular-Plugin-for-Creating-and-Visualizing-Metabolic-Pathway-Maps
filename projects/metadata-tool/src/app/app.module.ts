import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WorkflowModule } from './metadata-workflow/metadata-workflow.module';
import { MetaDataCheckboxSelectionModule } from './metadata-checkboxselection/metadata-checkboxselection.module';
import { MetadataUploadpageModule } from './metadata-uploadpage/metadata-uploadpage.module';
import { HttpClientModule } from '@angular/common/http';
import { MetadataDownloadpageModule } from './metadata-downloadpage/metadata-downloadpage.module';
import { StandardPageLayoutModule } from 'dist/shared-lib';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';

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



    HttpClientModule,
       FormlyModule.forRoot(),
       ReactiveFormsModule,
       FormlyMaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
