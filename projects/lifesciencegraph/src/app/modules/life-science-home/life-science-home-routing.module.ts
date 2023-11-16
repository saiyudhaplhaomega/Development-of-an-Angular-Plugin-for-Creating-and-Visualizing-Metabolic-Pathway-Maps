import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeScienceHomeComponent } from './life-science-home.component';

const routes: Routes = [
  {path: '', component: LifeScienceHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeScienceHomeRoutingModule { }
