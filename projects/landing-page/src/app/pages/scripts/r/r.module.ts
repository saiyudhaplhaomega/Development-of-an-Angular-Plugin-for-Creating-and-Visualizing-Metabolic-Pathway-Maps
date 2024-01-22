import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RRoutingModule } from './r-routing.component';
import { RComponent } from './r.component';

@NgModule({
  declarations: [RComponent],
  imports: [
    CommonModule,
    RRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [RComponent],
})
export class RModule { }
