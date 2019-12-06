import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {Routing} from './app.routing';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeDashboardPageComponent} from './home/components/home-dashboard-page/home-dashboard-page.component';
import {DatabaseSearchPageComponent} from './mpa/components/database-search-page/database-search-page.component';
import {LoginPageComponent} from './main/components/login-page/login-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProphaneComponent } from './prophane/prophane.component';
import {WebserveraddressService} from './main/services/webserveraddress.service';
import { SerializableObjectUploaderService_UNUSED } from './old_files/serializable-object-uploader.service_UNUSED';
import { FileUploaderService } from './main/services/file-uploader.service';
import {MPAComponent} from './mpa/mpa.component';
import {DataNavigationTreeComponent} from './mpa/components/data-navigation-tree/data-navigation-tree.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationBarComponent} from './main/components/navigation-bar/navigation-bar.component';
import {ModelDownloaderService} from './old_files/services_UNUSED/modeldownloader.service';
import {Neo4jhttprequestsService} from './old_files/services_UNUSED/neo4jhttprequests.service';
import {AuthGuard} from './main/services/auth-guard.service';
import {ModeluploaderService} from './old_files/services_UNUSED/modeluploader.service';
import {ModelContentService} from './old_files/services_UNUSED/modelcontent.service';
import {ProtDBContentService} from './old_files/services_UNUSED/protein-database.service';
import {DbsearchcontentService} from './mpa/components/database-search-page/services/dbsearchcontent.service';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {DataService} from './mpa/components/data-navigation-tree/services/data.service';
import {NavService} from './mpa/components/data-navigation-tree/services/nav.service';
import { TreeNodeComponent } from './mpa/components/tree-node/tree-node.component';
import { UserPageComponent } from './mpa/components/user-page/user-page.component';
import { FolderPageComponent } from './mpa/components/folder-page/folder-page.component';
import { ExperimentPageComponent } from './mpa/components/experiment-page/experiment-page.component';
import { ProphaneViewerComponent } from './prophane-viewer/prophane-viewer.component';
import { ProphaneJobControlComponent } from './prophane-job-control/prophane-job-control.component';
import { ProphaneAboutComponent } from './prophane-about/prophane-about.component';
/*import {MaterialModule} from './material-module';*/

// Configs
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('533975881425-kerne9k4q8rhiqt6q0mn0gtcftohibcp.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeDashboardPageComponent,
    DatabaseSearchPageComponent,
    MPAComponent,
    DataNavigationTreeComponent,
    LoginPageComponent,
    ProphaneComponent,
    NavigationBarComponent,
    TreeNodeComponent,
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    ProphaneViewerComponent,
    ProphaneJobControlComponent,
    ProphaneAboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Routing,
    CommonModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,

    DragDropModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [
    HttpClient,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    WebserveraddressService,
    SerializableObjectUploaderService_UNUSED,
    FileUploaderService,
    DbsearchcontentService,
    NavService,
    DataService,
    AuthGuard
  ],
  entryComponents: [
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
