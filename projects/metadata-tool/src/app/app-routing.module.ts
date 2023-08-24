import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';
import { MetadataWorkflowComponent } from './metadata-workflow/metadata-workflow.component';


const routes: Routes = [
  { path: 'home', component: MetadataLandingPageComponent },
  {
    path: 'workflow',
    loadChildren: () =>
      import('./metadata-workflow/metadate-workflow.module').then((m) => m.WorkflowModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
