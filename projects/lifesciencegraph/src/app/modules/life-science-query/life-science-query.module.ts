import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeScienceQueryRoutingModule } from './life-science-query-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LifeScienceQueryComponent } from './life-science-query.component';


@NgModule({
  declarations: [
    LifeScienceQueryComponent,
  ],
  imports: [
    CommonModule,
    LifeScienceQueryRoutingModule,

    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ]
})
export class LifeScienceQueryModule { }
