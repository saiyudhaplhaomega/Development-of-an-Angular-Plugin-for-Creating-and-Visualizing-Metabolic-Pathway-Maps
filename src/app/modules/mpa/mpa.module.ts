import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routing} from '../../app.routing';

import {MaterialModule} from '../../shared/material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Neo4jGraphPageComponent} from './pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomedashboardComponent} from './pages/home-dashboard-page/homedashboard.component';
import {DBSearchContentComponent} from './pages/database-search-page/dbsearchcontent.component';
import {ProteinloadercontentComponent} from './pages/protein-database-page/proteinloadercontent.component';
import {ModelcontentComponent} from './pages/model-generator-page/modelcontent.component';

import {ModeluploaderService} from './pages/model-generator-page/modeluploader.service';
import {ModelDownloaderService} from './pages/model-generator-page/modeldownloader.service';
import {ProteinUploaderService} from './pages/protein-database-page/proteindbuploader.service';
import {DbsearchcontentService} from './pages/database-search-page/dbsearchcontent.service';
import {ModelContentService} from './pages/model-generator-page/modelcontent.service';
import {ProtDBContentService} from './pages/protein-database-page/proteinloadercontent.service';
import {SigninComponent} from '../../signin/signin.component';
import {WebserverloginService} from './services/webserverlogin.service';

@NgModule({
  declarations: [
    Neo4jGraphPageComponent,
    HomedashboardComponent,
    DBSearchContentComponent,
    ProteinloadercontentComponent,
    ModelcontentComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,

    Routing,

    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    ModeluploaderService,
    ModelDownloaderService,
    ProteinUploaderService,
    DbsearchcontentService,
    ModelContentService,
    ProtDBContentService,
    WebserverloginService
  ]
})
export class MpaModule { }
