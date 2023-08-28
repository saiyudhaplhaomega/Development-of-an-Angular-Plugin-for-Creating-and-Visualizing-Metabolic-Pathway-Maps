import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, AuthGuard } from 'shared-lib';
import { ProphaneResultViewComponent } from './modules/job-control/prophane-result-view/prophane-result-view.component';

const routes: Routes = [

{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginPageComponent },
{
  path: 'jobsubmission',
  loadChildren: () =>
  import('./modules/job-submission/job-submission.module').then(
    (m) => m.JobSubmissionModule
  ),
  canActivate: [AuthGuard],
},
{
  path: 'jobcontrol',
  loadChildren: () =>
  import('./modules/job-control/job-control.module').then(
    (m) => m.JobControlModule
  ),
  canActivate: [AuthGuard],
},
{ path: 'about',
  loadChildren: () =>
  import('./modules/about-prophane/about-prophane.module').then(
    (m) => m.AboutProphaneModule
  ),
},


{ path: 'results/:job_uuid', component: ProphaneResultViewComponent },
{ path: '**', redirectTo: 'login' },


// {
//   path: '',
//   component: ProphaneJobSubmissionMainComponent,
//   canActivate: [AuthGuard],
//   pathMatch: 'full',
// },
// {
//    path: 'jobs',
//    canActivate: [AuthGuard],
//   redirectTo: '/prophane/(prophaneContent:jobs)',
//   pathMatch: 'full',
// },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
