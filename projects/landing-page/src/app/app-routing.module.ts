import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from 'shared-lib';

// TODO: route guard? (the route guard for workflow routes still exists)

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },

  {
    path: 'mpa-page',
    loadChildren: () =>
      import('./pages/tools/mpa/mpa.module').then((m) => m.MpaModule),
  },
  {
    path: 'prophane-page',
    loadChildren: () =>
      import('./pages/tools/prophane/prophane.module').then((m) => m.ProphaneModule),
  },
  {
    path: 'metaforge-page',
    loadChildren: () =>
      import('./pages/tools/metaforge/metaforge.module').then((m) => m.MetaForgeModule),
  },
  {
    path: 'mdoa-team',
    loadChildren: () =>
      import('./pages/about/mdoa-team/mdoa-team.module').then((m) => m.MdoaTeamModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'r',
    loadChildren: () =>
      import('./pages/scripts/r/r.module').then((m) => m.RModule),
  },

  {
    path: 'app-tools',
    loadChildren: () =>
      import('./landing-page/background/background.module').then((m) => m.BackgroundModule),
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
