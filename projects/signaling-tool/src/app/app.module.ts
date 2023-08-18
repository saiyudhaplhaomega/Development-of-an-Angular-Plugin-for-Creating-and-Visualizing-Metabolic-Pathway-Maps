import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NavToolbarModule} from 'shared-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent,
       
   
   

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
