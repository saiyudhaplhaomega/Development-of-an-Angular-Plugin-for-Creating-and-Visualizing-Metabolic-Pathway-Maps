// TODO: decouple mpa module from services that are used at the app module level to leverage lazy loading

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MPAComponent } from './mpa.component';

const routes: Routes = [
  { path: '', component: MPAComponent }, // guarded by app router
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MpaRoutingModule {}
