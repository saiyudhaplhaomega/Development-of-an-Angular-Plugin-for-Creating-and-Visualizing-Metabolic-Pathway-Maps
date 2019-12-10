import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material-module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Routing} from '../app.routing';
import {NavigationBarComponent} from '../core/components/navigation-bar/navigation-bar.component';
import {FolderPageComponent} from './components/folder-page/folder-page.component';
import {TreeNodeComponent} from './components/tree-node/tree-node.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {ExperimentPageComponent} from './components/experiment-page/experiment-page.component';
import {DatabaseSearchPageComponent} from './components/database-search-page/database-search-page.component';
import {DataNavigationTreeComponent} from './components/data-navigation-tree/data-navigation-tree.component';
import {MPAComponent} from './mpa.component';
import {LoginPageComponent} from '../core/components/login-page/login-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { SocialLoginModule } from 'angularx-social-login';

@NgModule({
  declarations: [
    TreeNodeComponent,
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent,
    MPAComponent,
    DataNavigationTreeComponent,
  ],
  imports: [
    CommonModule,
    Routing,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    SocialLoginModule,
    // material module last
    MaterialModule,
  ],
  entryComponents: [
    UserPageComponent,
    FolderPageComponent,
    ExperimentPageComponent
  ],
  exports: [
    MPAComponent,
  ]
})
export class MpaModule { }
