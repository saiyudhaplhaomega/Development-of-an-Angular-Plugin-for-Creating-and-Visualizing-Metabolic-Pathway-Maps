import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routing} from '../../app.routing';

import {MaterialModule} from '../../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Neo4jGraphPageComponent} from './pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomedashboardComponent} from './pages/home-dashboard-page/home-dashboard-page.component';
import {DBSearchContentComponent} from './pages/database-search-page/database-search-page.component';
import {ProteinloadercontentComponent} from './pages/protein-database-page/protein-database-page.component';
import {ModelcontentComponent} from './pages/model-database-page/model-database-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

import {SigninComponent} from '../../signin/signin.component';
import {WebserverloginService} from './services/webserverlogin.service';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    Neo4jGraphPageComponent,
    HomedashboardComponent,
    DBSearchContentComponent,
    ProteinloadercontentComponent,
    ModelcontentComponent,
    SigninComponent,
    TestPageComponent
  ],
  imports: [
    CommonModule,

    Routing,

    MaterialModule,
    BrowserAnimationsModule,

    FlexLayoutModule
  ],
  providers: [
    WebserverloginService
  ]
})
export class MpaModule { }
