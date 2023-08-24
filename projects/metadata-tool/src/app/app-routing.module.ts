import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';
import { MetadataWorkflowComponent } from './metadata-workflow/metadata-workflow.component';
import { MetaDataCheckboxSelectionComponent } from './metadata-checkboxselection/metadata-checkboxselection.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./app.module').then((m) => m.AppModule),
      component: AppComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
