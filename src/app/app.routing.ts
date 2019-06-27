import { Routes, RouterModule } from '@angular/router';
import {Neo4jGraphPageComponent} from './modules/mpa/pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomeDashboardPageComponent} from './modules/mpa/pages/home-dashboard-page/home-dashboard-page.component';
import {DatabaseSearchPageComponent} from './modules/mpa/pages/database-search-page/database-search-page.component';
import {ProteinDatabasePageComponent} from './modules/mpa/pages/protein-database-page/protein-database-page.component';
import {ModelDatabasePageComponent} from './modules/mpa/pages/model-database-page/model-database-page.component';
import {LoginPageComponent} from './modules/mpa/pages/login-page/login-page.component';
import {TestPageComponent} from './modules/mpa/pages/test-page/test-page.component';

import {AuthGuard} from './core/services/auth-guard.service';
import { ProphaneJobPageComponent } from './modules/mpa/pages/prophane-job-page/prophane-job-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomeDashboardPageComponent},
  { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
  { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
  { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
  { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
  { path: 'prophane', component: ProphaneJobPageComponent, canActivate: [AuthGuard]},
  { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
