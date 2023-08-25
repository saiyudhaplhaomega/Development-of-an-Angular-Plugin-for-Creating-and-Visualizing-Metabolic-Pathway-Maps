import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StandardPageLayoutModule } from 'shared-lib';


// TODO: remove this
import { MaterialModule } from 'projects/mpa/src/app/material-module';
// TODO: move to shared-lib

import { FooterComponent } from 'projects/mpa/src/app/core/components/footer/page-footer';
import { ProphaneModule } from './prophane/prophane.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    StandardPageLayoutModule,
    ProphaneModule,
    MaterialModule,
  ],
  providers: [
    //HttpClient,
    //UploadProgressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


