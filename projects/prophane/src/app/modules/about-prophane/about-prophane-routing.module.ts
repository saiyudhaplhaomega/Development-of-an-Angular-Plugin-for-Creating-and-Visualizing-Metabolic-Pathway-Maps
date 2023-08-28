import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProphaneAboutComponent } from './prophane-about/prophane-about.component';

const routes: Routes = [
  {path: '', component: ProphaneAboutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutProphaneRoutingModule { }
