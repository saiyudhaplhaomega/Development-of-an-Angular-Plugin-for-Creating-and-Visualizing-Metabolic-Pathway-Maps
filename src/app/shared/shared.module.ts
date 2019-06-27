import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material-module';
import {WebserveraddressService} from './services/webserveraddress.service';

import { SerializableObjectUploaderService } from './services/serializable-object-uploader.service';
import { FileUploaderService } from './services/file-uploader.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    WebserveraddressService,
    SerializableObjectUploaderService,
    FileUploaderService
  ]
})
export class SharedModule { }
