import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';

const routes: Routes = [
  {path: '', component: ProphaneJobSubmissionMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSubmissionRoutingModule { }
