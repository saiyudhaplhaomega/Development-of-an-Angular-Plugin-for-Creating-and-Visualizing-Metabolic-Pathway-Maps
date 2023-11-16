import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeScienceProteinsRoutingModule } from './life-science-proteins-routing.module';
import { LifeScienceProteinsComponent } from './life-science-proteins.component';


@NgModule({
  declarations: [
    LifeScienceProteinsComponent,
  ],
  imports: [
    CommonModule,
    LifeScienceProteinsRoutingModule
  ]
})
export class LifeScienceProteinsModule { }
