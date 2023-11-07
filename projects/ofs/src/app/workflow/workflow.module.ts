import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowComponent } from './workflow.component';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ResultsComponent } from './results/results.component';
import { ResultsFigureComponent } from './results/results-figure/results-figure.component';
import { OverviewInputComponent } from './data-overview/overview-input/overview-input.component';
import { OverviewResultsComponent } from './data-overview/overview-results/overview-results.component';
import { PreprocessingInputComponent } from './preprocessing/preprocessing-input/preprocessing-input.component';
import { PreprocessingResultsComponent } from './preprocessing/preprocessing-results/preprocessing-results.component';
import { WrapperInputComponent } from './wrapper/wrapper-input/wrapper-input.component';
import { WrapperResultsComponent } from './wrapper/wrapper-results/wrapper-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ResultsInputComponent } from './results/results-input/results-input.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { WorkflowPanelModule } from 'shared-lib';
import { ResultsDownloadComponent } from './results/results-download/results-download.component';
import { ResultFiguresModule } from 'shared-lib';
import { WorkflowRoutingModule } from './workflow-routing.module';

@NgModule({
  declarations: [
    WorkflowComponent,
    DataOverviewComponent,
    PreprocessingComponent,
    WrapperComponent,
    ResultsComponent,
    ResultsFigureComponent,
    OverviewResultsComponent,
    OverviewInputComponent,
    PreprocessingInputComponent,
    PreprocessingResultsComponent,
    WrapperInputComponent,
    WrapperResultsComponent,
    ResultsInputComponent,
    ResultsDownloadComponent,
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    WorkflowPanelModule,
    ResultFiguresModule,
    WorkflowRoutingModule,
  ],
  providers: [],
})
export class WorkflowModule {}
