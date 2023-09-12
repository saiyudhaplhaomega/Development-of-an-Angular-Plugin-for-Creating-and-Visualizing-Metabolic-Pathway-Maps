import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowRoutingModule } from './workflow-routing.module';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WrapperResultsInputComponent } from './wrapper/wrapper-results-input/wrapper-results-input.component';
import { PreprocessingResultsInputComponent } from './preprocessing/preprocessing-results-input/preprocessing-results-input.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconDividerModule, WorkflowPanelModule } from 'shared-lib';
import { ResultsDownloadComponent } from './results/results-download/results-download.component';
import { ResultFiguresModule } from 'shared-lib';

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
    WrapperResultsInputComponent,
    PreprocessingResultsInputComponent,
    ResultsDownloadComponent,
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
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
    IconDividerModule,
    WorkflowPanelModule,
    ResultFiguresModule,
  ],
  providers: [],
})
export class WorkflowModule {}
