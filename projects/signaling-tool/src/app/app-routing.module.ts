 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './workflow/settings/settings.component';
import { ResultsComponent } from './workflow/results/results.component';


const routes: Routes = [  


  { path: 'home', component: LandingPageComponent },

  { path: 'landing', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingModule) }, 

  {
    path: 'workflow',
    loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 









