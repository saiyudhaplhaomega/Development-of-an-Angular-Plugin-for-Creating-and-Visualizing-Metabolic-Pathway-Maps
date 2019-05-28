import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import {Neo4jcontentComponent} from './modules/neo4jcontent/neo4jcontent.component';
import {HomedashboardComponent} from './modules/homedashboard/homedashboard.component';
import {DBSearchContentComponent} from './modules/dbsearchcontent/dbsearchcontent.component';
import {ProteinloadercontentComponent} from './modules/proteinloadercontent/proteinloadercontent.component';
import {ModelcontentComponent} from './modules/modelcontent/modelcontent.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  { path: 'home', component: HomedashboardComponent},
  { path: 'neo4j', component: Neo4jcontentComponent},
  { path: 'dbsearch', component: DBSearchContentComponent},
  { path: 'proteinloader', component: ProteinloadercontentComponent},
  { path: 'modeltrainer', component: ModelcontentComponent},

//  { path: '404'},
  { path: '**', redirectTo: 'home' }
];
export const Routing = RouterModule.forRoot(appRoutes);
