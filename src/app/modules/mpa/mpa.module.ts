import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { ProphaneJobPageComponent } from './pages/prophane-job-page/prophane-job-page.component';
import { NodeComponent } from './components/node/node.component';
import { ExperimentComponent } from './components/experiment/experiment.component';
import { FolderComponent } from './components/folder/folder.component';
import { SearchComponent } from './components/search/search.component';
import { FileComponent } from './components/file/file.component';
import { TreeComponent } from './components/tree/tree.component';
import { ContentComponent } from './components/content/content.component';

import {NgbButtonsModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    Neo4jGraphPageComponent,
    HomeDashboardPageComponent,
    DatabaseSearchPageComponent,
    ProteinDatabasePageComponent,
    ModelDatabasePageComponent,
    LoginPageComponent,
    TestPageComponent,
    ProphaneJobPageComponent,
    NodeComponent,
    ExperimentComponent,
    FolderComponent,
    SearchComponent,
    FileComponent,
    TreeComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbButtonsModule,

    Routing,

    BrowserAnimationsModule,
    MaterialModule,

    FlexLayoutModule
  ],
  entryComponents: [
    ExperimentComponent,
    FolderComponent,
    SearchComponent,
    FileComponent
  ],
  providers: []
})
export class MpaModule { }
