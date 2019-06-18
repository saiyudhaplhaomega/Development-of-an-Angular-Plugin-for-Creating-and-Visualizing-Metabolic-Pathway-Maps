import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavComponent } from './components/nav/nav.component';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

import {Routing} from '../app.routing';

import {MaterialModule} from './../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ProteinUploaderService} from './services/protein-uploader.service';
import {ProtDBContentService} from './services/protein-database.service';

import {ModeluploaderService} from './services/modeluploader.service';
import {ModelDownloaderService} from './services/modeldownloader.service';
import {ModelContentService} from './services/modelcontent.service';
import {DbsearchcontentService} from './services/dbsearchcontent.service';

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
  ],
  providers: [
    ProteinUploaderService,
    ProtDBContentService,
    ModeluploaderService,
    ModelDownloaderService,
    ModelContentService,
    DbsearchcontentService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}