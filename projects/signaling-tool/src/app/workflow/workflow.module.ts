 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { RouterModule, Routes } from '@angular/router';
import { ExplorationComponent } from './exploration/exploration.component';
import { SettingsComponent } from './settings/settings.component';
import { ResultsComponent } from './results/results.component';
import { StepperComponent } from './stepper/stepper.component'; 
import { MatStepperModule } from '@angular/material/stepper'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle'; 
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator'; 
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent },
      { path: 'results', component: ResultsComponent },
      { path: 'exploration', component: ExplorationComponent}
    ]
  }
];

@NgModule({
  declarations: [WorkflowComponent, ExplorationComponent, SettingsComponent, ResultsComponent, StepperComponent], 
  exports: [SettingsComponent], 
  imports: [
    CommonModule, 
    MatStepperModule,
    RouterModule.forChild(routes), 
    FormsModule,  
    ReactiveFormsModule, 
    MatSlideToggleModule, 
    MatTableModule,
    MatSortModule,
    MatPaginatorModule, 
    HttpClientModule, 
  
  ]
})
export class WorkflowModule { } 


