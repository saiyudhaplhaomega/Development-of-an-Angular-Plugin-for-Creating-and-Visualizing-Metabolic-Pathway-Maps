import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection.component';

const routes: Routes = [
  {path: '', component: MetaDataCheckboxSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataWorkflowRoutingModule { }
