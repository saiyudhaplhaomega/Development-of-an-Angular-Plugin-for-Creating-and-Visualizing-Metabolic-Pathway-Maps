import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfsLandingPageComponent } from './ofs-landing-page/ofs-landing-page.component';

// TODO: route guard? (the route guard for workflow routes still exists)

const routes: Routes = [
  { path: 'home', component: OfsLandingPageComponent },
  {
    path: 'workflow',
    loadChildren: () =>
      import('./workflow/workflow.module').then((m) => m.WorkflowModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
