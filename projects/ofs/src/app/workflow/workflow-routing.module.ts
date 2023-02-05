import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';
import { ResultsComponent } from './results/results.component';
import { WorkflowComponent } from './workflow.component';
import { WorkflowGuard } from './workflow.guard';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    children: [
      {
        path: 'overview',
        component: DataOverviewComponent,
        canActivate: [WorkflowGuard],
      },
      {
        path: 'preprocessing',
        component: PreprocessingComponent,
        canActivate: [WorkflowGuard],
      },
      {
        path: 'wrapper',
        component: WrapperComponent,
        canActivate: [WorkflowGuard],
      },
      {
        path: 'results',
        component: ResultsComponent,
        canActivate: [WorkflowGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
