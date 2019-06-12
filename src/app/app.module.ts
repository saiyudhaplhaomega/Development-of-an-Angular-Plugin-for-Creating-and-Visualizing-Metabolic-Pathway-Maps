import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MpaModule } from './modules/mpa/mpa.module';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';

import {WebserveraddressService} from './shared/services/webserveraddress.service';
import {Neo4jhttprequestsService} from './modules/mpa/services/neo4jhttprequests.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule,

    MpaModule,

    HttpClientModule,
  ],
  providers: [
    Neo4jhttprequestsService,
    HttpClient,
    WebserveraddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
