import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MetaForgeRoutingModule } from './metaforge-routing.component';
import { MetaForgeComponent } from './metaforge.component';

@NgModule({
  declarations: [MetaForgeComponent],
  imports: [
    CommonModule,
    MetaForgeRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [MetaForgeComponent],
})
export class MetaForgeModule { }
