import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
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
