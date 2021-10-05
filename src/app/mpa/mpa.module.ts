import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material-module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Routing} from '../app.routing';
import {FolderPageComponent} from './components/folder-page/folder-page.component';
import {TreeNodeComponent} from './components/tree-node/tree-node.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {ExperimentPageComponent} from './components/experiment-page/experiment-page.component';
import {DataNavigationTreeComponent} from './components/data-navigation-tree/data-navigation-tree.component';
import {MPAComponent} from './mpa.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MpaTableComponent } from './components/mpa-table/mpa-table.component';
import { PeptideTableComponent } from './components/peptide-table/peptide-table.component';
import {CdkDetailRowDirective} from './components/mpa-table/cdk-detail-row.directive';
import { ProteingroupDetailViewComponent } from './components/proteingroup-detail-view/proteingroup-detail-view.component';
import { ProteinTableComponent } from './components/protein-table/protein-table.component';
import { PsmTableComponent } from './components/psm-table/psm-table.component';
import { DescriptionDetailsComponent } from './components/description-details/description-details.component';
import {ResultTableComponent} from './components/result-table/result-table.component';
import {DatabaseSearchPageComponent} from './components/database-search-page/database-search-page.component';
import {DataService} from './components/data-navigation-tree/services/data.service';
import { PeaklistPageComponent } from './components/peaklist-page/peaklist-page.component';
import { SearchResultPageComponent } from './components/search-result-page/search-result-page.component';
import {DialogComponent} from '../core/components/dialog/dialog.component';
import {TextfieldDialogComponent} from '../core/components/textfield-dialog/textfield-dialog.component';

// import {ProteinDatabaseComponent} from './components/protein-database/protein-database-component';

@NgModule({
  declarations: [
    TreeNodeComponent,
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    MPAComponent,
    DataNavigationTreeComponent,
    DialogComponent,
    MpaTableComponent,
    PeptideTableComponent,
    CdkDetailRowDirective,
    ProteingroupDetailViewComponent,
    ProteinTableComponent,
    PsmTableComponent,
    DescriptionDetailsComponent,
    ResultTableComponent,
    DatabaseSearchPageComponent,
    PeaklistPageComponent,
    SearchResultPageComponent,
    TextfieldDialogComponent,
    // ProteinDatabaseComponent,
  ],
  imports: [
    CommonModule,
    Routing,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    // material module last
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    PeaklistPageComponent,
    SearchResultPageComponent,
    DialogComponent,
    TextfieldDialogComponent,
    // ProteinDatabaseComponent,
  ],
  exports: [
    MPAComponent,
  ]
})
export class MpaModule { }
