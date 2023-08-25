import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestExampleHomeComponent } from './test-example-home.component';

const routes: Routes = [
  {path: '', component: TestExampleHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestExampleHomeRoutingModule { }
