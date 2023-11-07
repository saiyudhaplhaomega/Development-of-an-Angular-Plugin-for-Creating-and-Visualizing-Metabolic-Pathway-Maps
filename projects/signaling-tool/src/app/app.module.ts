import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { StandardPageLayoutModule} from 'shared-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import { FormsModule } from '@angular/forms'; 
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field'; 
import { FooterComponent } from './footer/footer.component';  
import { MatStepperModule } from '@angular/material/stepper';  
import { WorkflowModule } from './workflow/workflow.module'; 
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';  
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator'; 
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
