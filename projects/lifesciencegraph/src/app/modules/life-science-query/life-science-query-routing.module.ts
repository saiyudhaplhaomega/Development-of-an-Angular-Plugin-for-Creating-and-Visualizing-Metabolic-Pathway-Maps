import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeScienceQueryComponent } from './life-science-query.component';

const routes: Routes = [
  {path: '', component: LifeScienceQueryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeScienceQueryRoutingModule { }
