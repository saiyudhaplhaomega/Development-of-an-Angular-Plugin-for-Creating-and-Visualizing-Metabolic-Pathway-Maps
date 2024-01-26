import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestExampleContentComponent } from './test-example-content.component';

const routes: Routes = [
  {path: '', component: TestExampleContentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestExampleContentRoutingModule { }
