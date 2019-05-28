import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SidenavComponent} from './modules/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavService} from './services/sidenav.service';
import {Routing} from './app.routing';
import {Neo4jcontentComponent} from './modules/neo4jcontent/neo4jcontent.component';
import {HomedashboardComponent} from './modules/homedashboard/homedashboard.component';
import {DBSearchContentComponent} from './modules/dbsearchcontent/dbsearchcontent.component';
import {Neo4jhttprequestsService} from './services/neo4jhttprequests.service';
import {HttpClient} from '@angular/common/http';
import {SideNavButtonComponent} from './modules/sidenav/sidenavbuttons/sidenavbutton.component';
import {ProteinloadercontentComponent} from './modules/proteinloadercontent/proteinloadercontent.component';
import {ModelcontentComponent} from './modules/modelcontent/modelcontent.component';
import {DemoMaterialModule} from '../material-module';
import {ToolbarComponent} from './modules/toolbar/toolbar.component';
import {ModeluploaderService} from './modules/modelcontent/modeluploader.service';
import {ModelDownloaderService} from './modules/modelcontent/modeldownloader.service';
import {ProteinUploaderService} from './modules/proteinloadercontent/proteindbuploader.service';
import {DbsearchcontentService} from './modules/dbsearchcontent/dbsearchcontent.service';
import {ModelContentService} from './modules/modelcontent/modelcontent.service';
import {ProtDBContentService} from './modules/proteinloadercontent/proteinloadercontent.service';
import {WebserveraddressService} from './services/webserveraddress.service';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    Neo4jcontentComponent,
    HomedashboardComponent,
    DBSearchContentComponent,
    SideNavButtonComponent,
    ProteinloadercontentComponent,
    ModelcontentComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    Routing,
    DemoMaterialModule
  ],
  providers: [SidenavService, Neo4jhttprequestsService, HttpClient, ModeluploaderService,
    ModelDownloaderService, ProteinUploaderService, DbsearchcontentService, ModelContentService, ProtDBContentService, WebserveraddressService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
