import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './modules/landing-page-module/landing-page.component';
import { LoginPageComponent } from 'shared-lib';

// TODO: route guard? (the route guard for workflow routes still exists)

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  {
    path: 'template',
    loadChildren: () =>
      import('./modules/page-modules/tool-modules/template-page-module/template.module').then((m) => m.TemplateModule),
  },
  {
    path: 'mpa-page',
    loadChildren: () =>
      import('./modules/page-modules/tool-modules/mpa-page-module/mpa.module').then((m) => m.MpaModule),
  },
  {
    path: 'prophane-page',
    loadChildren: () =>
      import('./modules/page-modules/tool-modules/prophane-page-module/prophane.module').then((m) => m.ProphaneModule),
  },
  {
    path: 'metaforge-page',
    loadChildren: () =>
      import('./modules/page-modules/tool-modules/metaforge-page-module/metaforge.module').then((m) => m.MetaForgeModule),
  },
  {
    path: 'mdoa-team',
    loadChildren: () =>
      import('./modules/page-modules/about-modules/mdoa-team-module/mdoa-team.module').then((m) => m.MdoaTeamModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/page-modules/about-modules/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'r',
    loadChildren: () =>
      import('./modules/page-modules/script-modules/r-page-module/r.module').then((m) => m.RModule),
  },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
