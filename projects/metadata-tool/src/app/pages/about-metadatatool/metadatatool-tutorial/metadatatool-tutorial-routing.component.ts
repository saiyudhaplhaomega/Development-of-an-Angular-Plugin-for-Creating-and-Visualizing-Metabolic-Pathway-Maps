import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadatatoolTutorial } from './metadatatool-tutorial.component';


const routes: Routes = [
  {path: '', component: MetadatatoolTutorial}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadatatoolTutorialRoutingModule { }
