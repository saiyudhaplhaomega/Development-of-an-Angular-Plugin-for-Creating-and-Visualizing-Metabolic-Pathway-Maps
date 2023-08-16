import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component'; 
import { Component3Component } from './component3/component3.component' 

import { NavToolbarModule} from 'shared-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FooterComponent } from './footer/footer.component';

import { NewPageComponent } from './new-page/new-page.component'; 

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,   
    FooterComponent, NewPageComponent
       
   
   

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    MatFormFieldModule,
    AppRoutingModule, 
    NavToolbarModule, 
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSelectModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
