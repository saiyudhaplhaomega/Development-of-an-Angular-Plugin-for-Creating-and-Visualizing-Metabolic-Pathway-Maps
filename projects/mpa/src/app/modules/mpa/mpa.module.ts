import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FolderPageComponent } from './components/folder-page/folder-page.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
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
import { NameEditDialogComponent } from './components/name-edit-dialog/name-edit-dialog.component';
import { TextfieldDialogComponent } from './components/textfield-dialog/textfield-dialog.component';
import { ProteinDatabaseDialogComponent } from './components/folder-page/protein-database-dialog/protein-database-dialog.component';
import { ProteinDatabaseComponent } from './components/protein-database/protein-database-component';
import { PsmTableComponent } from './components/psm-table/psm-table.component';
import { SpectrumViewerComponent } from './components/spectrum-viewer/spectrum-viewer.component';
import { ProteineSequenceViewerComponent } from './components/protein-sequence-viewer/proteine-sequence-viewer.component';
import { NgChartsModule } from 'ng2-charts';
import { MpaRoutingModule } from './mpa-routing.module';
import { TaxonomyTabComponent } from './components/experiment-page/taxonomy-tab/taxonomy-tab.component';
import { FunctionTabComponent } from './components/experiment-page/function-tab/function-tab.component';
import { CompareExperimentsDialogComponentComponent } from './components/experiment-page/compare-experiments-dialog/compare-experiments-dialog-component/compare-experiments-dialog-component.component';
import { ExperimentComparisonComponent } from './components/experiment-comparison/experiment-comparison.component';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { KeywordsTabComponent } from './components/experiment-page/keywords-tab/keywords-tab.component';

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
    ProteinDatabaseDialogComponent,
    ProteinDatabaseComponent,
    PsmTableComponent,
    SpectrumViewerComponent,
    ProteineSequenceViewerComponent,
    TaxonomyTabComponent,
    FunctionTabComponent,
    CompareExperimentsDialogComponentComponent,
    ExperimentComparisonComponent,
    FileUploadComponent,
    KeywordsTabComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,

    MpaRoutingModule,

    // material module last
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    CdkAccordionModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  exports: [MPAComponent],
})
export class MpaModule {}
