import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeScienceProteinsComponent } from './life-science-proteins.component';

const routes: Routes = [
  {path: '', component: LifeScienceProteinsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeScienceProteinsRoutingModule { }
