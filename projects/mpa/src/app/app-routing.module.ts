import { RouterModule, Routes } from '@angular/router';


import { MPAComponent } from './mpa/mpa.component';
import { TermsOfServicePageComponent } from './core/components/terms-of-service-page/terms-of-service-page.component';
import { ImpressumPageComponent } from './core/components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './core/components/privacy-policy-page/privacy-policy-page.component';
import { DatabaseSearchPageComponent } from './mpa/components/database-search-page/database-search-page.component';
import { ErrorPageComponent } from './error-page/error-page-component/error-page.component';
import { NgModule, OnInit } from '@angular/core';
import { AuthGuard, LoginPageComponent } from 'dist/shared-lib';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'mpa', component: MPAComponent,
  },
  {
    path: 'mpa',
    canLoad: [AuthGuard], // loads module only if route guard allows it
    canActivate: [AuthGuard],
    loadChildren: () => import('./mpa/mpa.module').then((m) => m.MpaModule),
  },
  { path: 'error', component: ErrorPageComponent },

  { path: 'termsofservice', component: TermsOfServicePageComponent },
  { path: 'privacypolicy', component: PrivacyPolicyPageComponent },
  { path: 'impressum', component: ImpressumPageComponent },
  { path: '**', redirectTo: 'login' },

  /*  { path: 'home', component: HomeDashboardPageComponent},
    { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
    { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
    { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'prophane', component: REFACTORING_prophaneJobSubmissionComponent, canActivate: [AuthGuard]},
    { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
