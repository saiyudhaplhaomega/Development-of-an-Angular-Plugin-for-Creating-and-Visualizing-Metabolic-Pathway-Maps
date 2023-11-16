import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeScienceHomeRoutingModule } from './life-science-home-routing.module';
import { LifeScienceHomeComponent } from './life-science-home.component';


@NgModule({
  declarations: [
    LifeScienceHomeComponent
  ],
  imports: [
    CommonModule,
    LifeScienceHomeRoutingModule
  ]
})
export class LifeScienceHomeModule { }
