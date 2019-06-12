import { Routes, RouterModule } from '@angular/router';
import {Neo4jGraphPageComponent} from './modules/mpa/pages/neo4j-graph-page/neo4j-graph-page.component';
import {HomedashboardComponent} from './modules/mpa/pages/home-dashboard-page/homedashboard.component';
import {DBSearchContentComponent} from './modules/mpa/pages/database-search-page/dbsearchcontent.component';
import {ProteinloadercontentComponent} from './modules/mpa/pages/protein-database-page/proteinloadercontent.component';
import {ModelcontentComponent} from './modules/mpa/pages/model-generator-page/modelcontent.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  { path: 'home', component: HomedashboardComponent},
  { path: 'neo4j', component: Neo4jGraphPageComponent},
  { path: 'dbsearch', component: DBSearchContentComponent},
  { path: 'proteinloader', component: ProteinloadercontentComponent},
  { path: 'modeltrainer', component: ModelcontentComponent},

  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
