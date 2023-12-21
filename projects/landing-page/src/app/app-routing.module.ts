import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from 'shared-lib';

// TODO: route guard? (the route guard for workflow routes still exists)

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },

  // {
  //   path: 'workflow',
  //   loadChildren: () =>
  //     import('./workflow/workflow.module').then((m) => m.WorkflowModule),
  // },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
