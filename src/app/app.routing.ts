import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './core/components/login-page/login-page.component';

import {AuthGuard} from './core/services/auth-guard.service';
import {ProphaneJobSubmissionMainComponent} from './prophane/components/prophane-job-submission-main/prophane-job-submission-main.component';
import {ProphaneJobControlComponent} from './prophane/components/prophane-job-control/prophane-job-control.component';
import {ProphaneAboutComponent} from './prophane/components/prophane-about/prophane-about.component';
import {ProphaneResultViewComponent} from './prophane/components/prophane-result-view/prophane-result-view.component';
import {MPAComponent} from './mpa/mpa.component';
import {TermsOfServicePageComponent} from './core/components/terms-of-service-page/terms-of-service-page.component';
import {ImpressumPageComponent} from './core/components/impressum-page/impressum-page.component';
import {PrivacyPolicyPageComponent} from './core/components/privacy-policy-page/privacy-policy-page.component';
import {DatabaseSearchPageComponent} from './mpa/components/database-search-page/database-search-page.component';
import {ErrorPageComponent} from './error-page/error-page-component/error-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'prophanejobs', redirectTo: '/prophane/(prophaneContent:jobs)', pathMatch: 'full'},
  { path: 'prophaneabout', component: ProphaneAboutComponent },
  { path: 'prophane', component: ProphaneJobSubmissionMainComponent, canActivate: [AuthGuard] },
  { path: 'prophanejobcontrol', component: ProphaneJobControlComponent, canActivate: [AuthGuard] },
  { path: 'results/:job_uuid', component: ProphaneResultViewComponent},
  { path: 'mpa', component: MPAComponent, canActivate: [AuthGuard]},
  { path: 'error', component: ErrorPageComponent },

  { path: 'termsofservice', component: TermsOfServicePageComponent},
  { path: 'privacypolicy', component: PrivacyPolicyPageComponent},
  { path: 'impressum', component: ImpressumPageComponent},
  { path: '**', redirectTo: 'login' }

  /*  { path: 'home', component: HomeDashboardPageComponent},
    { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
    { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
    { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'prophane', component: REFACTORING_prophaneJobSubmissionComponent, canActivate: [AuthGuard]},
    { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},*/
];
export const Routing = RouterModule.forRoot(appRoutes);

