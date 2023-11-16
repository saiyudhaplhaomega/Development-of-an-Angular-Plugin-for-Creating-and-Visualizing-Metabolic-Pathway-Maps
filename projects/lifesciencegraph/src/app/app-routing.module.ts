import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumPageComponent } from './components/impressum-page/impressum-page.component';
import { PrivacyPolicyPageComponent } from './components/privacy-policy-page/privacy-policy-page.component';
import { TermsOfServicePageComponent } from './components/terms-of-service-page/terms-of-service-page.component';



const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () =>
    import('./modules/life-science-home/life-science-home.module').then(
      (m) => m.LifeScienceHomeModule
    ),
  },
  {
    path: 'query',
    loadChildren: () =>
    import('./modules/life-science-query/life-science-query.module').then(
      (m) => m.LifeScienceQueryModule
    ),
  },
  {
    path: 'proteins',
    loadChildren: () =>
    import('./modules/life-science-proteins/life-science-proteins.module').then(
      (m) => m.LifeScienceProteinsModule
    ),
  },
  { path: 'termsofservice', component: TermsOfServicePageComponent },
  { path: 'impressum', component: ImpressumPageComponent },
  { path: 'privacypolicy', component: PrivacyPolicyPageComponent },
  { path: '**', redirectTo: 'home' },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
