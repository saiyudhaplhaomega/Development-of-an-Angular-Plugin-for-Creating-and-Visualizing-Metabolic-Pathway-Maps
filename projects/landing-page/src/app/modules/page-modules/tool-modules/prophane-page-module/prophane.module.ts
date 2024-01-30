import { NgModule } from '@angular/core';
import { ProphaneComponent } from './prophane.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProphaneRoutingModule } from './prophane-routing.component';

@NgModule({
  declarations: [ProphaneComponent],
  imports: [
    CommonModule,
    ProphaneRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [ProphaneComponent],
})
export class ProphaneModule { }
