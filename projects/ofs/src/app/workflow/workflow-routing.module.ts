import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataOverviewComponent } from './data-overview/data-overview.component';
import { PreprocessingComponent } from './preprocessing/preprocessing.component';
import { ResultsComponent } from './results/results.component';
import { WorkflowComponent } from './workflow.component';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    children: [
      { path: 'overview', component: DataOverviewComponent },
      { path: 'preprocessing', component: PreprocessingComponent },
      { path: 'wrapper', component: WrapperComponent },
      { path: 'results', component: ResultsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule {}
