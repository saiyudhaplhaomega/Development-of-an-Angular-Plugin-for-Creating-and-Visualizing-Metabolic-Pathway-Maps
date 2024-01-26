import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestExampleContentRoutingModule } from './test-example-content-routing.module';
import { TestExampleContentComponent } from './test-example-content.component';
import { OneComponent } from './components/one/one.component';
import { OnedotoneComponent } from './components/one/onedotone/onedotone.component';
import { OnedottwoComponent } from './components/one/onedottwo/onedottwo.component';
import { TwoComponent } from './components/two/two.component';


@NgModule({
  declarations: [
    TestExampleContentComponent,
    OneComponent,
    OnedotoneComponent,
    OnedottwoComponent,
    TwoComponent
  ],
  imports: [
    CommonModule,
    TestExampleContentRoutingModule
  ]
})
export class TestExampleContentModule { }
