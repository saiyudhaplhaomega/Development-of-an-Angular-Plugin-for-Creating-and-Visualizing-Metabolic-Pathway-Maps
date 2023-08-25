import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExampleHomeRoutingModule } from './test-example-home-routing.module';
import { TestExampleHomeComponent } from './test-example-home.component';


@NgModule({
  declarations: [
    TestExampleHomeComponent
  ],
  imports: [
    CommonModule,
    TestExampleHomeRoutingModule
  ]
})
export class TestExampleHomeModule { }
