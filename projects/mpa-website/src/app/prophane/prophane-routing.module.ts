import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'dist/shared-lib';
import { ProphaneAboutComponent } from './components/prophane-about/prophane-about.component';
import { ProphaneJobControlComponent } from './components/prophane-job-control/prophane-job-control.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';
import { ProphaneResultViewComponent } from './components/prophane-result-view/prophane-result-view.component';

const routes: Routes = [
  {
    path: '',
    component: ProphaneJobSubmissionMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'jobcontrol',
    component: ProphaneJobControlComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'jobs',
  //   redirectTo: '/prophane/(prophaneContent:jobs)',
  //   pathMatch: 'full',
  // },
  { path: 'about', component: ProphaneAboutComponent },
  { path: 'results/:job_uuid', component: ProphaneResultViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProphaneRoutingModule {}
