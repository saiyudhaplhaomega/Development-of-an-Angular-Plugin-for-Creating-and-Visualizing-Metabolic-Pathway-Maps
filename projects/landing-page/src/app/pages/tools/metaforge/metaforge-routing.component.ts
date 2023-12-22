import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaForgeComponent } from './metaforge.component';


const routes: Routes = [
  {path: '', component: MetaForgeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetaForgeRoutingModule { }
