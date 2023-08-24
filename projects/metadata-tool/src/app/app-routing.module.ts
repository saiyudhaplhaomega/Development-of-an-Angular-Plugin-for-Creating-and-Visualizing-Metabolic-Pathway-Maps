import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';
import { MetadataWorkflowComponent } from './metadata-workflow/metadata-workflow.component';
<<<<<<< HEAD
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection/metadata-checkboxselection.component';
import { AppComponent } from './app.component';
=======
>>>>>>> d13a3ec39ce85b2763df7683229ef1afc4042110


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
<<<<<<< HEAD
      import('./app.module').then((m) => m.AppModule),
      component: AppComponent
=======
      import('./metadata-workflow/metadate-workflow.module').then((m) => m.WorkflowModule)
>>>>>>> d13a3ec39ce85b2763df7683229ef1afc4042110
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
