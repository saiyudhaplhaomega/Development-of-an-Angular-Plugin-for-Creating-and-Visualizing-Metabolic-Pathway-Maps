import { NgModule } from '@angular/core';
import { MpaComponent } from './mpa.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MpaRoutingModule } from './mpa-routing.component';

@NgModule({
  declarations: [MpaComponent],
  imports: [
    CommonModule,
    MpaRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MpaComponent],
})
export class MpaModule { }
