import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataWorkflowPageComponent } from './metadata-workflow-page.component';

const routes: Routes = [{ path: '', component: MetadataWorkflowPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataWorkflowPageRoutingModule { }
