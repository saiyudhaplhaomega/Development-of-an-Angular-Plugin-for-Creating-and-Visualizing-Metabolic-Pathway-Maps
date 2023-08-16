import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestExampleHomeComponent } from './test-example-home.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TestExampleHomeRoutingModule {}
