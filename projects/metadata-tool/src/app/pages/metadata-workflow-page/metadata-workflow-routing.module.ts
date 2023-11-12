import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataWorkflowComponent } from './metadata-workflow.component';

const routes: Routes = [
  {path: '', component: MetadataWorkflowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataWorkflowRoutingModule { }
