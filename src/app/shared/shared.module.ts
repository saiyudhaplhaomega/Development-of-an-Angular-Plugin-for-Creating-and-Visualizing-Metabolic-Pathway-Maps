import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material-module';
import {WebserveraddressService} from './services/webserveraddress.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    WebserveraddressService
  ]
})
export class SharedModule { }
