import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MetadataLandingPageComponent } from './metadata-landing-page/metadata-landing-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: MetadataLandingPageComponent,
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./metadata-uploadpage/metadata-uploadpage.module').then(
        (m) => m.MetadataUploadpageModule
      ),
  },
  {
    path: 'workflow',
    loadChildren: () =>
      import('./metadata-workflow/metadata-workflow.module').then(
        (m) => m.WorkflowModule
      ),
  },
  {
    path: 'download',
    loadChildren: () =>
      import('./metadata-downloadpage/metadata-downloadpage.module').then(
        (m) => m.MetadataDownloadpageModule
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
