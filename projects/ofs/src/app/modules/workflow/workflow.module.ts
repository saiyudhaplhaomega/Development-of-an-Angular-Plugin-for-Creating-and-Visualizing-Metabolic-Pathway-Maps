import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowComponent } from './workflow.component';
import { MatStepperModule } from '@angular/material/stepper';
import { OverviewInputComponent } from './components/overview-input/overview-input.component';
import { OverviewResultsComponent } from './components/overview-results/overview-results.component';
import { PreprocessingInputComponent } from './components/preprocessing-input/preprocessing-input.component';
import { PreprocessingResultsComponent } from './components/preprocessing-results/preprocessing-results.component';
import { WrapperInputComponent } from './components/wrapper-input/wrapper-input.component';
import { WrapperResultsComponent } from './components/wrapper-results/wrapper-results.component';

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
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WorkflowPanelModule } from 'shared-lib';
import { ResultFiguresModule } from 'shared-lib';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { ClassificationResultsComponent } from './components/classification-results/classification-results.component';
import { DataDownloadComponent } from './components/data-download/data-download.component';
import { FeatureTableComponent } from './components/feature-table/feature-table.component';
import { StepperModule } from 'shared-lib';

@NgModule({
  declarations: [
    WorkflowComponent,
    OverviewResultsComponent,
    OverviewInputComponent,
    PreprocessingInputComponent,
    PreprocessingResultsComponent,
    WrapperInputComponent,
    WrapperResultsComponent,
    ClassificationResultsComponent,
    DataDownloadComponent,
    FeatureTableComponent,
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
    StepperModule,
  ],
  providers: [],
})
export class WorkflowModule {}
