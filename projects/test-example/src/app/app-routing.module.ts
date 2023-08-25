import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'shared-lib';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/test-example-home/test-example-home.module').then(
        (m) => m.TestExampleHomeModule
      ),
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./modules/test-example-content/test-example-content.module').then(
        (m) => m.TestExampleContentModule
      ),
  },
  {
    path: 'login', component: LoginPageComponent,
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
