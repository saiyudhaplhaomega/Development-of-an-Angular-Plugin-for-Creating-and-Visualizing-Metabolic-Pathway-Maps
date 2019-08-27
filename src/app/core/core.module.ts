import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NavComponent } from './components/nav/nav.component';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

import {Routing} from '../app.routing';

import {MaterialModule} from './../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ProtDBContentService} from './services/protein-database.service';

import {ModeluploaderService} from './services/modeluploader.service';
import {ModelDownloaderService} from './services/modeldownloader.service';
import {ModelContentService} from './services/modelcontent.service';
import {DbsearchcontentService} from './services/dbsearchcontent.service';
import {Neo4jhttprequestsService} from './services/neo4jhttprequests.service';

import { AuthGuard } from './services/auth-guard.service';

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
    ProtDBContentService,
    ModeluploaderService,
    ModelDownloaderService,
    ModelContentService,
    DbsearchcontentService,
    Neo4jhttprequestsService,
    AuthGuard
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}