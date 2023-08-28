import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProphaneJobControlComponent } from './prophane-job-control/prophane-job-control.component';

const routes: Routes = [
  {path: '', component: ProphaneJobControlComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobControlRoutingModule { }
