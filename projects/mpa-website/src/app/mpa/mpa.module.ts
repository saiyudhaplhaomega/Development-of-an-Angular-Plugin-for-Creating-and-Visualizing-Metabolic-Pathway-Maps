import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FolderPageComponent } from './components/folder-page/folder-page.component';
import { TreeNodeComponent } from './components/data-navigation-tree/tree-node/tree-node.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ExperimentPageComponent } from './components/experiment-page/experiment-page.component';
import { DataNavigationTreeComponent } from './components/data-navigation-tree/data-navigation-tree.component';
import { MPAComponent } from './mpa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpaTableComponent } from './components/mpa-table/mpa-table.component';
import { PeptideTableComponent } from './components/peptide-table/peptide-table.component';
import { CdkDetailRowDirective } from './components/mpa-table/cdk-detail-row.directive';
import { ProteingroupDetailViewComponent } from './components/proteingroup-detail-view/proteingroup-detail-view.component';
import { ProteinTableComponent } from './components/protein-table/protein-table.component';
import { DescriptionDetailsComponent } from './components/description-details/description-details.component';
import { ResultTableComponent } from './components/result-table/result-table.component';
import { DatabaseSearchPageComponent } from './components/database-search-page/database-search-page.component';
import { PeaklistPageComponent } from './components/peaklist-page/peaklist-page.component';
import { SearchResultPageComponent } from './components/search-result-page/search-result-page.component';
import { NameEditDialogComponent } from '../core/components/dialog/name-edit-dialog.component';
import { TextfieldDialogComponent } from '../core/components/textfield-dialog/textfield-dialog.component';
import { DeleteWarningDialogComponent } from '../core/components/dialog/delete-warning-dialog.component';
import { ProteinDatabaseDialogComponent } from './components/folder-page/protein-database-dialog/protein-database-dialog.component';
import { ProteinDatabaseComponent } from './components/protein-database/protein-database-component';
import { PsmTableComponent } from './components/psm-table/psm-table.component';
import { SpectrumViewerComponent } from './components/spectrum-viewer/spectrum-viewer.component';
import { ProteineSequenceViewerComponent } from './components/protein-sequence-viewer/proteine-sequence-viewer.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    TreeNodeComponent,
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    MPAComponent,
    DataNavigationTreeComponent,
    NameEditDialogComponent,
    MpaTableComponent,
    PeptideTableComponent,
    CdkDetailRowDirective,
    ProteingroupDetailViewComponent,
    ProteinTableComponent,
    DescriptionDetailsComponent,
    ResultTableComponent,
    DatabaseSearchPageComponent,
    PeaklistPageComponent,
    SearchResultPageComponent,
    TextfieldDialogComponent,
    DeleteWarningDialogComponent,
    ProteinDatabaseDialogComponent,
    ProteinDatabaseComponent,
    PsmTableComponent,
    SpectrumViewerComponent,
    ProteineSequenceViewerComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    NgChartsModule,
    // material module last
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [MPAComponent],
})
export class MpaModule {}
