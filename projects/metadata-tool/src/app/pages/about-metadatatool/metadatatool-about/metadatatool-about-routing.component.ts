import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMetadatatool } from './metadatatool-about.component';


const routes: Routes = [
  {path: '', component: AboutMetadatatool}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMetadatatoolRoutingModule { }
