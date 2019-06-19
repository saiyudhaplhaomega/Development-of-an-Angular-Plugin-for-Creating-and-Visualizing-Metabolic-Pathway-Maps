import { Routes, RouterModule } from '@angular/router';
import {Neo4jGraphPageComponent} from './modules/mpa/pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomedashboardComponent} from './modules/mpa/pages/home-dashboard-page/home-dashboard-page.component';
import {DBSearchContentComponent} from './modules/mpa/pages/database-search-page/database-search-page.component';
import {ProteinloadercontentComponent} from './modules/mpa/pages/protein-database-page/protein-database-page.component';
import {ModelcontentComponent} from './modules/mpa/pages/model-database-page/model-database-page.component';
import {SigninComponent} from './signin/signin.component';
import {TestPageComponent} from './modules/mpa/pages/test-page/test-page.component';

import {AuthGuard} from './core/services/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: SigninComponent},
  { path: 'home', component: HomedashboardComponent},
  { path: 'neo4j', component: Neo4jGraphPageComponent, canActivate: [AuthGuard]},
  { path: 'dbsearch', component: DBSearchContentComponent, canActivate: [AuthGuard]},
  { path: 'proteinloader', component: ProteinloadercontentComponent, canActivate: [AuthGuard]},
  { path: 'modeltrainer', component: ModelcontentComponent, canActivate: [AuthGuard]},
  { path: 'test', component: TestPageComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
