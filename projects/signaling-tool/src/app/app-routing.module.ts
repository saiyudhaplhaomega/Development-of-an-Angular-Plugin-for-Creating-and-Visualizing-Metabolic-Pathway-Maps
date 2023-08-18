import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  

  { path: 'landing', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingModule) },
  { path: 'workflow', loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule) }, 

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





