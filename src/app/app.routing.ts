import { Routes, RouterModule } from '@angular/router';
import {Neo4jGraphPageComponent} from './modules/mpa/pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomedashboardComponent} from './modules/mpa/pages/home-dashboard-page/home-dashboard-page.component';
import {DBSearchContentComponent} from './modules/mpa/pages/database-search-page/database-search-page.component';
import {ProteinloadercontentComponent} from './modules/mpa/pages/protein-database-page/protein-database-page.component';
import {ModelcontentComponent} from './modules/mpa/pages/model-database-page/model-database-page.component';
import {SigninComponent} from './signin/signin.component';
import {TestPageComponent} from './modules/mpa/pages/test-page/test-page.component'

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'home', component: HomedashboardComponent},
  { path: 'neo4j', component: Neo4jGraphPageComponent},
  { path: 'dbsearch', component: DBSearchContentComponent},
  { path: 'proteinloader', component: ProteinloadercontentComponent},
  { path: 'modeltrainer', component: ModelcontentComponent},
  { path: 'test', component: TestPageComponent},

  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
