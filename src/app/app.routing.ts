import {RouterModule, Routes} from '@angular/router';
import {HomeDashboardPageComponent} from './home/components/home-dashboard-page/home-dashboard-page.component';
import {LoginPageComponent} from './core/components/login-page/login-page.component';

import {AuthGuard} from './core/services/auth-guard.service';
import {ProphaneJobSubmissionComponent} from './prophane/components/prophane-job-submission/prophane-job-submission.component';
import {ProphaneJobControlComponent} from './prophane/components/prophane-job-control/prophane-job-control.component';
import {ProphaneAboutComponent} from './prophane/components/prophane-about/prophane-about.component';
import {ProphaneViewerComponent} from './prophane/prophane-viewer.component';
import {MPAComponent} from './mpa/mpa.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomeDashboardPageComponent},
  { path: 'prophanejobs', redirectTo: '/prophane/(prophaneContent:jobs)', pathMatch: 'full'},
  { path: 'prophane', component: ProphaneViewerComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/prophane/(prophaneContent:new)', pathMatch: 'full'},
      { path: 'new', component: ProphaneJobSubmissionComponent, outlet: 'prophaneContent'},
      { path: 'jobs', component: ProphaneJobControlComponent, outlet: 'prophaneContent'},
      { path: 'about', component: ProphaneAboutComponent, outlet: 'prophaneContent'} ]},
  { path: 'mpa', component: MPAComponent, canActivate: [AuthGuard]},

  /*  { path: 'home', component: HomeDashboardPageComponent},
    { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
    { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
    { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
    { path: 'prophane', component: ProphaneJobSubmissionComponent, canActivate: [AuthGuard]},
    { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},*/

  { path: '**', redirectTo: 'login' }
];
export const Routing = RouterModule.forRoot(appRoutes);

