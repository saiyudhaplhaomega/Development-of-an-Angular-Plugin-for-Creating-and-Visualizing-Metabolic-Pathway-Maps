import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowComponent } from './workflow.component';
import { DataOverviewComponent } from './components/data-overview/data-overview.component';
import { PreprocessingComponent } from './components/preprocessing/preprocessing.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { OverviewInputComponent } from './components/data-overview/overview-input/overview-input.component';
import { OverviewResultsComponent } from './components/data-overview/overview-results/overview-results.component';
import { PreprocessingInputComponent } from './components/preprocessing/preprocessing-input/preprocessing-input.component';
import { PreprocessingResultsComponent } from './components/preprocessing/preprocessing-results/preprocessing-results.component';
import { WrapperInputComponent } from './components/wrapper/wrapper-input/wrapper-input.component';
import { WrapperResultsComponent } from './components/wrapper/wrapper-results/wrapper-results.component';

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
import { ClassificationComponent } from './components/classification/classification.component';
import { PanelSelectionComponent } from './components/panel-selection/panel-selection.component';
import { ClassificationResultsComponent } from './components/classification/classification-results/classification-results.component';
import { DataDownloadComponent } from './components/classification/data-download/data-download.component';
import { FeatureTableComponent } from './components/panel-selection/feature-table/feature-table.component';

@NgModule({
  declarations: [
    WorkflowComponent,
    DataOverviewComponent,
    PreprocessingComponent,
    WrapperComponent,
    OverviewResultsComponent,
    OverviewInputComponent,
    PreprocessingInputComponent,
    PreprocessingResultsComponent,
    WrapperInputComponent,
    WrapperResultsComponent,
    ClassificationComponent,
    PanelSelectionComponent,
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
  ],
  providers: [],
})
export class WorkflowModule {}
