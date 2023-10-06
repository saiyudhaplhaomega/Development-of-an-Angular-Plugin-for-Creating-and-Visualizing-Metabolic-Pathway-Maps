import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent, AuthGuard } from 'shared-lib';
import { ProphaneResultViewComponent } from './modules/job-control/prophane-result-view/prophane-result-view.component';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { ProphaneTutorialComponent } from './modules/about-prophane/prophane-tutorial/prophane-tutorial.component';

const routes: Routes = [

{ path: '', redirectTo: 'jobsubmission', pathMatch: 'full'},
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
// { path: 'tutorial',
//   loadChildren: () =>
//   import('./components/prophane-tutorial/prophane-tutorial.component').then(
//     (m) => m.ProphaneTutorialComponent
//   ),
// },

{ path: 'tutorial', component: ProphaneTutorialComponent },
{ path: 'termsofservice', component: TermsOfServicePageComponent },
{ path: 'impressum', component: ImpressumPageComponent },
{ path: 'privacypolicy', component: PrivacyPolicyPageComponent },

{ path: 'results/:job_uuid', component: ProphaneResultViewComponent },
{ path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
