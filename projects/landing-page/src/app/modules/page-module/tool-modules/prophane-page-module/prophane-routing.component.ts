import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProphaneComponent } from './prophane.component';


const routes: Routes = [
  {path: '', component: ProphaneComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProphaneRoutingModule { }
