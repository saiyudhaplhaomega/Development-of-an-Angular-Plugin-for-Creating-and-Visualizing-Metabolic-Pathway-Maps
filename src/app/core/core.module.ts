import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavComponent } from './components/nav/nav.component';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

import {Routing} from '../app.routing';

import {MaterialModule} from './../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NavigationBarComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    Routing,

    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavigationBarComponent,
    NavComponent
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}