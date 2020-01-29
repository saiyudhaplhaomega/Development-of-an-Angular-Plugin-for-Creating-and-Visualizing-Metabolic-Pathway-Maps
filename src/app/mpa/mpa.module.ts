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
import {FormsModule} from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';
import { MpaTableComponent } from './components/mpa-table/mpa-table.component';
import { PeptideTableComponent } from './components/peptide-table/peptide-table.component';
import {CdkDetailRowDirective} from './components/mpa-table/cdk-detail-row.directive';
import { ProteingroupDetailViewComponent } from './components/proteingroup-detail-view/proteingroup-detail-view.component';
import { ProteinTableComponent } from './components/protein-table/protein-table.component';
import { PsmTableComponent } from './components/psm-table/psm-table.component';
import { DescriptionDetailsComponent } from './components/description-details/description-details.component';

@NgModule({
  declarations: [
    TreeNodeComponent,
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    MPAComponent,
    DataNavigationTreeComponent,
    MpaTableComponent,
    PeptideTableComponent,
    CdkDetailRowDirective,
    ProteingroupDetailViewComponent,
    ProteinTableComponent,
    PsmTableComponent,
    DescriptionDetailsComponent,
  ],
  imports: [
    CommonModule,
    Routing,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    SocialLoginModule,
    // material module last
    MaterialModule,
  ],
  entryComponents: [
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent
  ],
  exports: [
    MPAComponent,
  ]
})
export class MpaModule { }
