import { Routes, RouterModule } from '@angular/router';
import {Neo4jGraphPageComponent} from './old_files/pages_UNUSED/neo4j-graph-page/neo4j-graph-page.component';
import {HomeDashboardPageComponent} from './home/components/home-dashboard-page/home-dashboard-page.component';
import {DatabaseSearchPageComponent} from './mpa/components/database-search-page/database-search-page.component';
import {ProteinDatabasePageComponent} from './old_files/pages_UNUSED/protein-database-page/protein-database-page.component';
import {ModelDatabasePageComponent} from './old_files/pages_UNUSED/model-database-page/model-database-page.component';
import {LoginPageComponent} from './main/components/login-page/login-page.component';

import {AuthGuard} from './main/services/auth-guard.service';
import { ProphaneComponent } from './prophane/prophane.component';
import {MPAComponent} from './mpa/mpa.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomeDashboardPageComponent},
  { path: 'prophane', component: ProphaneComponent, canActivate: [AuthGuard]},
  { path: 'mpa', component: MPAComponent, canActivate: [AuthGuard]},

/*  { path: 'home', component: HomeDashboardPageComponent},
  { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
  { path: 'dbsearch', component: DatabaseSearchPageComponent, canActivate: [AuthGuard]},
  { path: 'proteinloader', component: ProteinDatabasePageComponent, canActivate: [AuthGuard]},
  { path: 'modeltrainer', component: ModelDatabasePageComponent, canActivate: [AuthGuard]},
  { path: 'prophane', component: ProphaneComponent, canActivate: [AuthGuard]},
  { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},*/

  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
