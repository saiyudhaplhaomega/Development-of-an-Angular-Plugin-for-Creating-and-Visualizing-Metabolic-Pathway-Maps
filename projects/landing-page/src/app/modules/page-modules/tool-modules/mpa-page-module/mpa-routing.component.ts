import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpaComponent } from './mpa.component';


const routes: Routes = [
  {path: '', component: MpaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MpaRoutingModule { }
