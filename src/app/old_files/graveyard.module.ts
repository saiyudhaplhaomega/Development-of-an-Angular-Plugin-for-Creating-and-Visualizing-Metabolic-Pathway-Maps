///<reference path="../../../node_modules/@angular/platform-browser/src/browser.d.ts"/>

import {ProteinDatabasePageComponent} from './pages_UNUSED/protein-database-page/protein-database-page.component';
import {NavComponent} from './nav_UNUSED/nav.component';
import {ModelDatabasePageComponent} from './pages_UNUSED/model-database-page/model-database-page.component';
import {Neo4jGraphPageComponent} from './pages_UNUSED/neo4j-graph-page/neo4j-graph-page.component';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material-module';

@NgModule({
  declarations: [
    ProteinDatabasePageComponent,
    NavComponent,
    ModelDatabasePageComponent,
    Neo4jGraphPageComponent,
  ],
  imports: [
    MaterialModule
  ]
})

export class GraveyardModule { }
