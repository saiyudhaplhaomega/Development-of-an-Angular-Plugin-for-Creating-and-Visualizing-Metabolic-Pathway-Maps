import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginPageComponent } from 'dist/shared-lib';
import { ProphaneAboutComponent } from './components/prophane-about/prophane-about.component';
import { ProphaneJobControlComponent } from './components/prophane-job-control/prophane-job-control.component';
import { ProphaneJobSubmissionMainComponent } from './components/prophane-job-submission-main/prophane-job-submission-main.component';
import { ProphaneResultViewComponent } from './components/prophane-result-view/prophane-result-view.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent },

  { path: 'jobsubmission', component: ProphaneJobSubmissionMainComponent,
    //canActivate: [AuthGuard],
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

    // const routes: Routes = [

  //   {
  //     path: 'prophane',
  //     loadChildren: () =>
  //       import('./prophane/prophane.module').then((m) => m.ProphaneModule),
  //   },
  //   {
  //     path: 'mpa',
  //     canLoad: [AuthGuard], // loads module only if route guard allows it
  //     canActivate: [AuthGuard],
  //     loadChildren: () => import('./mpa/mpa.module').then((m) => m.MpaModule),
  //   },
  //   { path: 'error', component: ErrorPageComponent },

  //   { path: 'termsofservice', component: TermsOfServicePageComponent },
  //   { path: 'privacypolicy', component: PrivacyPolicyPageComponent },
  //   { path: 'impressum', component: ImpressumPageComponent },
  //   { path: '**', redirectTo: 'login' },

  //   /*  { path: 'home', component: HomeDashboardPageComponent},
  //     { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
  //     { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
  //     { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
  //     { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
  //     { path: 'prophane', component: REFACTORING_prophaneJobSubmissionComponent, canActivate: [AuthGuard]},
  //     { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},*/
  // ];
