import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RComponent } from './r.component';


const routes: Routes = [
  {path: '', component: RComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RRoutingModule { }
