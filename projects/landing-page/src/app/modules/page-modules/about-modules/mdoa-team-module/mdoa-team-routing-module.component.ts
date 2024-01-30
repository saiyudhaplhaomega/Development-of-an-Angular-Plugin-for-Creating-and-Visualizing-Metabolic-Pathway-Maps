import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MdoaTeamComponent } from './mdoa-team.component';


const routes: Routes = [
  {path: '', component: MdoaTeamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MdoaTeamRoutingModule { }
