import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, AuthGuard } from 'shared-lib';
import { ProphaneAboutComponent } from './prophane/components/prophane-about/prophane-about.component';
import { ProphaneJobControlComponent } from './prophane/components/prophane-job-control/prophane-job-control.component';
import { ProphaneJobSubmissionMainComponent } from './prophane/components/prophane-job-submission-main/prophane-job-submission-main.component';
import { ProphaneResultViewComponent } from './prophane/components/prophane-result-view/prophane-result-view.component';

const routes: Routes = [

  //   { path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginPageComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
