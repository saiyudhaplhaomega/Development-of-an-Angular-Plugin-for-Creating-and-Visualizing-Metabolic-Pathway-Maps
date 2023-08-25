import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExampleContentRoutingModule } from './test-example-content-routing.module';
import { TestExampleContentComponent } from './test-example-content.component';


@NgModule({
  declarations: [
    TestExampleContentComponent
  ],
  imports: [
    CommonModule,
    TestExampleContentRoutingModule
  ]
})
export class TestExampleContentModule { }
