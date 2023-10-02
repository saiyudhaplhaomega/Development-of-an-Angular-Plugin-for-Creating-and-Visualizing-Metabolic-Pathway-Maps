import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { StandardPageLayoutModule} from 'shared-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FooterComponent } from './footer/footer.component';  
import { MatStepperModule } from '@angular/material/stepper';  
import { WorkflowModule } from './workflow/workflow.module'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';  
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import {Component} from '@angular/core'; 





@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent
       


  ],
  imports: [
    BrowserModule, 
    WorkflowModule,
    FormsModule, 
    MatFormFieldModule,
    AppRoutingModule, 
    StandardPageLayoutModule, 
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSelectModule,  
    RouterModule, 
    MatStepperModule, 
    MatSlideToggleModule, 
    HttpClientModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule, 

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
