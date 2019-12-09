import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeDashboardPageComponent} from './components/home-dashboard-page/home-dashboard-page.component';
import {FolderPageComponent} from '../mpa/components/folder-page/folder-page.component';
import {UserPageComponent} from '../mpa/components/user-page/user-page.component';
import {ExperimentPageComponent} from '../mpa/components/experiment-page/experiment-page.component';

@NgModule({
  declarations: [
    HomeDashboardPageComponent,
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    HomeDashboardPageComponent
  ],
  exports: [
    HomeDashboardPageComponent,
  ]

})
export class HomeModule { }
