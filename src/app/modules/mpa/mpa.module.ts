import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routing} from '../../app.routing';

import {MaterialModule} from '../../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Neo4jGraphPageComponent} from './pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomeDashboardPageComponent} from './pages/home-dashboard-page/home-dashboard-page.component';
import {DatabaseSearchPageComponent} from './pages/database-search-page/database-search-page.component';
import {ProteinDatabasePageComponent} from './pages/protein-database-page/protein-database-page.component';
import {ModelDatabasePageComponent} from './pages/model-database-page/model-database-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

import {LoginPageComponent} from './pages/login-page/login-page.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    Neo4jGraphPageComponent,
    HomeDashboardPageComponent,
    DatabaseSearchPageComponent,
    ProteinDatabasePageComponent,
    ModelDatabasePageComponent,
    LoginPageComponent,
    TestPageComponent
  ],
  imports: [
    CommonModule,

    Routing,

    MaterialModule,
    BrowserAnimationsModule,

    FlexLayoutModule
  ],
  providers: []
})
export class MpaModule { }
